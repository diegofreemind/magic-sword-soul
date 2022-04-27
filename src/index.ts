import express, { Application } from 'express';
import { createCharacterRouter } from './routes/CreateCharacterRouter';

const app: Application = express();

app.use(express.json());
app.use('/', createCharacterRouter);

export default app;
