import { NextFunction, Request, Response, Router } from 'express';
import { findCharacterController } from '../useCases/FindCharacter';

const findCharacterRouter = Router();

findCharacterRouter.get(
  '/character/:id',
  (req: Request, res: Response, next: NextFunction) =>
    findCharacterController.handle(req, res, next)
);

export { findCharacterRouter };
