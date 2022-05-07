import { Character } from '../../src/entities/Character';
import { CharacterRepositoryFake } from './CharacterRepositoryFake';
import { ICharacterUseCase } from '../../src/shared/adapters/ICharacterUseCase';

const characterRepositoryFake = new CharacterRepositoryFake();

export class CharacterUseCaseFake implements ICharacterUseCase {
  InMemoryCharacters: Character[] =
    characterRepositoryFake.InMemoryCharacters.collection;

  updateCharacterById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findCharacterById(id: string): Promise<Character | undefined> {
    return characterRepositoryFake.findById(id);
  }
}
