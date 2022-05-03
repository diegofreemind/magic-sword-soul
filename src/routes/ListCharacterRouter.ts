import { NextFunction, Request, Response, Router } from 'express';
import { listCharacterController } from '../useCases/ListCharacter';

const listCharacterRouter = Router();

listCharacterRouter.get(
  '/character',
  (req: Request, res: Response, next: NextFunction) =>
    listCharacterController.handle(req, res, next)
);

export { listCharacterRouter };
