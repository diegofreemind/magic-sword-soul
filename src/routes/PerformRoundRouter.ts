import { NextFunction, Request, Response, Router } from 'express';
import { roundController } from '../useCases/PerformBattle';

const performRoundRouter = Router();

performRoundRouter.post(
  '/round',
  (req: Request, res: Response, next: NextFunction) =>
    roundController.executeRound(req, res, next)
);

export { performRoundRouter };
