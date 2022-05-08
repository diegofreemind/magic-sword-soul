import FindCharacterUseCase from '../../useCases/FindCharacter/FindCharacterUseCase';
import CharacterRepository from '../../repositories/implementations/CharacterRepository';
import { ICharacterUseCase } from '../adapters/ICharacterUseCase';
import { Character } from '../../entities/Character';

const characterRepository = new CharacterRepository();

const findCharacterUseCase = new FindCharacterUseCase(characterRepository);
// const updateCharacterUseCase = new UpdateCharacterUseCase(characterRepository);

export class CharacterUseCaseAdapter implements ICharacterUseCase {
  updateCharacterById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findCharacterById(id: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }
}
