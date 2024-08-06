import express from 'express';
import http from 'http';
import cors from 'cors';

import { wsServer } from './ws-connection';
import router from './routes';

const port = 4000;
const app = express();

app.use(cors()).use(express.json());

app.use('/api/v1', router);

export const server = http.createServer(app);
wsServer(server);

server.listen(port, () => console.log(`http://localhost:${port}`));

