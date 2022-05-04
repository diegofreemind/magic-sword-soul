import { NextFunction, Request, Response } from 'express';
import { HTTP_SUCCESS_CODE } from '../../shared/constants/httpStatusCode';
import ListCharacterUseCase from '../../useCases/ListCharacter/ListCharacterUseCase';

export default class ListCharacterController {
  constructor(private listCharacterUseCase: ListCharacterUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      // TODO: decouple pagination
      const props = request.query;
      const characters = await this.listCharacterUseCase.execute(props);

      return response.status(HTTP_SUCCESS_CODE).send(characters);
    } catch (error: any) {
      next(error);
    }
  }
}
