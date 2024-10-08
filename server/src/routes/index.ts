import express, { Request, Response } from 'express';
import docker, { cmdCommand, CONTAINER_TO_PORT, PORT_TO_CONTAINER } from '../docker';
import { Container } from 'dockerode';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.json({message: 'HI!!! from Dockerrency'});
});

router.get('/containers', async (_req: Request, res: Response) => {
    const containers = await docker.listContainers();
    res.json(containers);
});

router.post('/new-container', async (req: Request, res: Response) => {
    try {
        const { image, name, cmd } = req.body;

        let availableHostPort: number;
        let availableInternalPort: number;

        if (image === 'postgres-terminal') {
            availableHostPort =  5432;
            availableInternalPort = 5432;
        } else if (image === 'mongo-terminal') {
            availableHostPort = 27017;
            availableInternalPort = 27017;
        } else {
            availableInternalPort = 3000;
            availableHostPort = 8000;
        }

        if(availableHostPort === 8000) {
            while (PORT_TO_CONTAINER[availableHostPort] && availableHostPort < 9000 && availableInternalPort < 4000) {
                availableHostPort++;
                availableInternalPort++;

                if (availableHostPort > 8999 || availableInternalPort > 3999) {
                    throw new Error('No available ports');
                }
            }
        }

        let env: Record<string, string> = {};

        if (image === 'postgres-terminal') {
            env = {
                POSTGRES_USER: 'myuser',
                POSTGRES_PASSWORD: 'mypassword',
                POSTGRES_DB: 'mydb',
            };
        }
        
        if (image === 'mongo-terminal') {
            env = {
                MONGO_INITDB_ROOT_USERNAME: 'root',
                MONGO_INITDB_ROOT_PASSWORD: 'example',
            };
        }

        const container = await docker.createContainer({
            Image: image,
            name,
            Cmd: image === 'ubuntu-vscode-node' ? cmdCommand(image, availableInternalPort) : [],
            Tty: true,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Env: Object.entries(env).map(([key, value]) => `${key}=${value}`),
            ExposedPorts: {
                [`${availableInternalPort}/tcp`]: {}
            },
            HostConfig: {
                PortBindings: {
                    [`${availableInternalPort}/tcp`]: [
                        {
                            HostPort: availableHostPort.toString(),
                        },
                    ],
                },
                NetworkMode: 'my_network',
            },
        });

        await container.start();

        // Update PORT_TO_CONTAINER and CONTAINER_TO_PORT before sending the response
        PORT_TO_CONTAINER[availableHostPort] = container.id;
        CONTAINER_TO_PORT[container.id] = {
            internal: availableInternalPort.toString(),
            external: availableHostPort.toString(),
        };

        res.status(200).json({
            message: 'Container created and exec instance started successfully',
            containerId: container.id,
            internalPort: availableInternalPort,
            externalPort: availableHostPort,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
        console.error('Error creating container:', err.message);
    }
});

router.delete('/container', async (req: Request, res: Response) => {
    try {
        const containers = await docker.listContainers();

        for(const containerInfo of containers) {
            const container: Container = docker.getContainer(containerInfo.Id);
            await container.stop();
            await container.remove();
        }

        for(const port in PORT_TO_CONTAINER){
            delete PORT_TO_CONTAINER[port];
        }

        for(const containerId in CONTAINER_TO_PORT){
            delete CONTAINER_TO_PORT[containerId];
        }

        res.json({
            message: `All container stopped and removed : ${containers.length}`,
        });
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
})

export default router;