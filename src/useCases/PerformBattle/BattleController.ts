import PerformBattleUseCase from '../../useCases/PerformBattle/PerformBattleUseCase';
import { NextFunction, Request, Response } from 'express';
import {
  HTTP_SUCCESS_CODE,
  HTTP_CREATED_CODE,
} from '../../shared/constants/httpStatusCode';

export default class PerformBattleController {
  constructor(private performBattleUseCase: PerformBattleUseCase) {}
  async createBattle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const props = request.body;
      const battle = await this.performBattleUseCase.createBattle(props);

      return response.status(HTTP_CREATED_CODE).send(battle);
    } catch (error: any) {
      next(error);
    }
  }

  async initBattle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const battleId = request.params.id;
      const battle = await this.performBattleUseCase.executeBattle(battleId);

      return response.status(HTTP_SUCCESS_CODE).send(battle);
    } catch (error: any) {
      next(error);
    }
  }
}
