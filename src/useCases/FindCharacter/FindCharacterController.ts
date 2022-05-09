import { NextFunction, Request, Response } from 'express';
import FindCharacterUseCase from './FindCharacterUseCase';
import { HTTP_SUCCESS_CODE } from '../../shared/constants/httpStatusCode';

export default class FindCharacterController {
  constructor(private listCharacterUseCase: FindCharacterUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const props = request.params.id;
      const character = await this.listCharacterUseCase.execute(props, true);

      return response.status(HTTP_SUCCESS_CODE).send(character);
    } catch (error: any) {
      next(error);
    }
  }
}
