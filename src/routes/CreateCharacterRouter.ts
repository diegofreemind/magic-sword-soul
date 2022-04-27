import { createCharacterController } from '../useCases';
import { Router, Request, Response } from 'express';

const createCharacterRouter = Router();

createCharacterRouter.post('/character', (req: Request, res: Response) =>
  createCharacterController.handle(req, res)
);

export { createCharacterRouter };
