import PerformBattleUseCase from '../../useCases/PerformBattle/PerformBattleUseCase';
import { HTTP_CREATED_CODE } from '../../shared/constants/httpStatusCode';
import { NextFunction, Request, Response } from 'express';

export default class PerformRoundController {
  constructor(private performBattleUseCase: PerformBattleUseCase) {}
  async executeRound(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const props = request.body;
      const battleState = await this.performBattleUseCase.executeRound(props);

      return response.status(HTTP_CREATED_CODE).send(battleState);
    } catch (error: any) {
      next(error);
    }
  }
}
