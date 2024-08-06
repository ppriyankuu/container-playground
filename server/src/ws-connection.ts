import { RawData, WebSocket, WebSocketServer } from 'ws';
import docker, { CONTAINER_TO_PORT, PORT_TO_CONTAINER } from './docker';
import { Server } from 'http';
import { Exec } from 'dockerode';
import { deleteFile, getFilesTree, readFile, writeFile } from './file-management';

export const wsServer = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('one user connected!');

    let container: any;
    let containerId: string;

    ws.on('message', async (message: RawData) => {
      const { event, data } = JSON.parse(message.toString());

      if (event === 'containerId') {
        containerId = data;
        console.log(`containerId received : ${containerId}`);

        try {
          container = docker.getContainer(containerId);

          const exec: Exec = await container.exec({
            Cmd: ['/bin/bash'],
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
          });

          const stream: any = await new Promise((resolve, reject) => {
            exec.start({ hijack: true, stdin: true }, (err, stream) => {
              if (err) return reject(err);
              resolve(stream);
            });
          });

          stream.on('data', (data: string) => {
            ws.send(JSON.stringify({ event: 'output', data: `${data}` }));
          });

          stream.on('end', () => {
            ws.close();
          });

          ws.on('message', async (message: RawData) => {
            const { event, data } = JSON.parse(message.toString());

            switch (event) {
              case 'getFileTree':
                try {
                  const files = await getFilesTree(container, data.path || '/home');
                  ws.send(JSON.stringify({ event: 'fileTree', data: files }));
                } catch (error: any) {
                  console.error(`Error getting file tree : ${error.message}`);
                  ws.send(JSON.stringify({ event: 'error', data: 'Failed to get file tree' }));
                }
                break;

              case 'readFile':
                try {
                  const content = await readFile(container, data.filePath);
                  ws.send(JSON.stringify({ event: 'fileContent', data: { filePath: data.filePath, content } }));
                } catch (error: any) {
                  console.error(`Error reading file : ${error.message}`);
                  ws.send(JSON.stringify({ event: 'error', data: 'Failed to read file' }));
                }
                break;

              case 'writeFile':
                try {
                  await writeFile(container, data.filePath, data.content);
                  ws.send(JSON.stringify({ event: 'fileWritten', data: data.filePath }));
                } catch (error: any) {
                  console.error(`Error writing file : ${error.message}`);
                  ws.send(JSON.stringify({ event: 'error', data: 'Failed to write file!' }));
                }
                break;

              case 'deleteFile':
                try {
                  await deleteFile(container, data.filePath);
                  ws.send(JSON.stringify({ event: 'fileDeleted', data: data.filePath }));
                } catch (error: any) {
                  console.error(`Error deleting file : ${error.message}`);
                  ws.send(JSON.stringify({ event: 'error', data: 'Failed to delete file!' }));
                }
                break;

              case 'input':
                stream.write(data);
                break;
            }
          });
        } catch (error: any) {
          console.log(`Error: ${error.message}`);

          if (container) {
            try {
              await container.stop();
              await container.remove();
            } catch (cleanupErr: any) {
              console.error(`Error cleaning up container: ${cleanupErr.message}`);
            }
          }
        }
      }
    });

    ws.on('close', async () => {
      console.log('user disconnected');

      if (container) {
        try {
          console.log('Stopping and removing container: ', containerId);
          await container.stop();
          await container.remove();

          const { external } = CONTAINER_TO_PORT[containerId];
          delete PORT_TO_CONTAINER[external];
          delete CONTAINER_TO_PORT[containerId];
        } catch (error: any) {
          console.error('Error cleaning up container:', error.message);
        }
      }
    });
  });
};
