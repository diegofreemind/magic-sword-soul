import { createCharacterController } from '../useCases';
import { Router, Request, Response, NextFunction } from 'express';

const createCharacterRouter = Router();

createCharacterRouter.post(
  '/character',
  (req: Request, res: Response, next: NextFunction) =>
    createCharacterController.handle(req, res, next)
);

export { createCharacterRouter };
