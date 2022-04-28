import { NextFunction, Request, Response, Router } from 'express';
import { createCharacterController } from '../useCases/CreateCharacter';

const createCharacterRouter = Router();

createCharacterRouter.post(
  '/character',
  (req: Request, res: Response, next: NextFunction) =>
    createCharacterController.handle(req, res, next)
);

export { createCharacterRouter };
