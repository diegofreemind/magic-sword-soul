import { CharacterDTO } from './CharacterDTO';
import { validatorDto } from '../shared/validators/validatorDTO';
import CreateCharacterUseCase from '../useCases/CreateCharacterUseCase';

// TODO: validate attributes ( Value Object responsability )
export default class CreateCharacterController {
  constructor(private createCharacterUseCase: CreateCharacterUseCase) {}
  async handle(props: any) {
    try {
      await validatorDto(CharacterDTO, props);
      const newCharacter = this.createCharacterUseCase.execute(props);
      return newCharacter;
    } catch (error) {
      throw error;
    }
  }
}
