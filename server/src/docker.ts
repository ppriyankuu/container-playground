import Docker from 'dockerode'

const docker = new Docker();

export default docker;

// mapping port numbers (as string) to container IDs
export const PORT_TO_CONTAINER: Record<string, string> = {}; 
// mapping container IDs to their internal and external ports (as strings)
export const CONTAINER_TO_PORT: Record<
    string,
    {internal: string, external: string}
> = {};

export function cmdCommand(image: string, availableInternalPort: number){
    switch (image) {
       
        case 'mongo-terminal':
            return ["mongosh"];

        case 'postgres-terminal':
            return ['psql', '-U', 'myuser']
        
        case 'alpine':
            return ["sh"];
        
        case 'node':
            return ["node"];
        
        case 'python':
            return ["python"];
        
        default:
            return ["bash"];
    }
}
