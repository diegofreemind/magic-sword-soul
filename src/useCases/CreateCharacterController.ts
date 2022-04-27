import { Request, Response } from 'express';
import { CharacterDTO } from './CharacterDTO';
import { validatorDto } from '../shared/validators/validatorDTO';
import CreateCharacterUseCase from '../useCases/CreateCharacterUseCase';

// TODO: validate attributes ( Value Object responsability )
export default class CreateCharacterController {
  constructor(private createCharacterUseCase: CreateCharacterUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const props = request.body;
      await validatorDto(CharacterDTO, props);
      const newCharacter = this.createCharacterUseCase.execute(props);

      return response.status(201).json(newCharacter);
    } catch (error: any) {
      return response.status(400).json({
        error: error?.message || 'Unexpected error',
      });
    }
  }
}
