import { NextFunction, Request, Response } from 'express';
import { ListCharacterDTO } from '../useCases/ListCharacter/ListCharacterDTO';
import ListCharacterUseCase from '../useCases/ListCharacter/ListCharacterUseCase';

import { validatorDto } from '../shared/validators/validatorDTO';
import { HTTP_SUCCESS_CODE } from '../shared/constants/httpStatusCode';

// TODO: validate attributes ( Value Object responsability )
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
      await validatorDto(ListCharacterDTO, props);
      const characters = await this.listCharacterUseCase.execute(props);

      return response.status(HTTP_SUCCESS_CODE).send(characters);
    } catch (error: any) {
      next(error);
    }
  }
}
