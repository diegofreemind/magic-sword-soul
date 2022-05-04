import { NextFunction, Request, Response } from 'express';
import { HTTP_CREATED_CODE } from '../../shared/constants/httpStatusCode';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { CreateCharacterDTO } from '../../useCases/CreateCharacter/CreateCharacterDTO';
import CreateCharacterUseCase from '../../useCases/CreateCharacter/CreateCharacterUseCase';

// TODO: validate attributes ( Value Object responsability )
export default class CreateCharacterController {
  constructor(private createCharacterUseCase: CreateCharacterUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const props = request.body;
      await validatorDto(CreateCharacterDTO, props);
      const newCharacter = await this.createCharacterUseCase.execute(props);

      return response.status(HTTP_CREATED_CODE).send(newCharacter);
    } catch (error: any) {
      next(error);
    }
  }
}
