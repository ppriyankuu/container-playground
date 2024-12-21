import Docker from 'dockerode';

const docker = new Docker({socketPath: '/var/run/docker.sock'});

const execCommand = async (container: any, Cmd: string[]) : Promise<string> => {
    const exec = await container.exec({
        Cmd,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
    });

    const execStream = await exec.start();

    return new Promise<string>((resolve, reject) => {
        let output = '';
        execStream.on('data', (chunk: Buffer) => {
            output += chunk.toString();
        });
        execStream.on('end', () => {
            resolve(output.trim());
        });
        execStream.on('error', (err: any) => reject(err));
    });
};

const parseFileTree = (output: string) => {
    const lines = output.split('\n').filter(Boolean);
    const fileTree: any = {type: 'directory', name: '/' , children: {}};

    let currentDir = fileTree.children;

    lines.forEach(line => {
        const pathParts = line.split('/');
        let node = currentDir;

        for(let i = 0; i < pathParts.length; ++i){
           

            if(!part) continue;

            if(!node[part]){
                if (i === pathParts.length - 1) {
                    node[part] = { type: 'file', name: part };
                }
                else {
                    node[part] = { type: 'directory', name: part, children: {}};
                }
            }         
            node = node[part].children;
        }
    });

    // @ts-ignore
    return Object.values(fileTree.children)[0].children;
}

export const getFilesTree = async (container: any, path: string) => {
    try {
        const output = await execCommand(container, ['ls', '-R', path]);
        const cleanedOutput = output.replace(/[\u0000-\u001F]/g, '');
        const fileTree = parseFileTree(cleanedOutput);
        return fileTree;
    } catch (error: any) {
        console.error('Error retrieving file tree', error.message)
        throw Error;
    }
}

export const readFile = async (container: any, filePath: string) => {
    try {
        const output = await execCommand(container, ['cat', filePath]);
        return output;
    } catch (error: any) {
        console.error('Error reading file', error.message);
        throw Error;
    }
}

export const writeFile = async (container: any, filePath: string, content: string): Promise<void> => {
  try {
    const script = `echo "${content.replace(/"/g, '\\"')}" > ${filePath}`;
    await execCommand(container, ['sh', '-c', script]);
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
};

export const deleteFile = async (container: any, filePath: string): Promise<void> => {
  try {
    await execCommand(container, ['rm', '-f', filePath]);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
    throw error;
  }
};
