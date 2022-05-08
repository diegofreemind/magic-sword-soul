import { NextFunction, Request, Response, Router } from 'express';
import { battleController } from '../useCases/PerformBattle';

const performBattleRouter = Router();

performBattleRouter.post(
  '/battle',
  (req: Request, res: Response, next: NextFunction) =>
    battleController.createBattle(req, res, next)
);

performBattleRouter.patch(
  '/battle/:id',
  (req: Request, res: Response, next: NextFunction) =>
    battleController.initBattle(req, res, next)
);

export { performBattleRouter };
