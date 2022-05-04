import { NextFunction, Request, Response } from 'express';
import { HTTP_CREATED_CODE } from '../../shared/constants/httpStatusCode';
import CreateCharacterUseCase from '../../useCases/CreateCharacter/CreateCharacterUseCase';

export default class CreateCharacterController {
  constructor(private createCharacterUseCase: CreateCharacterUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const props = request.body;
      const newCharacter = await this.createCharacterUseCase.execute(props);

      return response.status(HTTP_CREATED_CODE).send(newCharacter);
    } catch (error: any) {
      next(error);
    }
  }
}
