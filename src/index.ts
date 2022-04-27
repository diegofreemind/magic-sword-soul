import express, { Application } from 'express';
import { errorMiddleware } from './shared/middlewares/errorMiddleware';
import { createCharacterRouter } from './routes/CreateCharacterRouter';

const app: Application = express();

app.use(express.json());
app.use(errorMiddleware);
app.use('/', createCharacterRouter);

export default app;
