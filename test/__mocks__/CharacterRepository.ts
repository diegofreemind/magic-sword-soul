import Mage from '../../src/entities/Mage';
import Warrior from '../../src/entities/Warrior';
import { Character } from '../../src/entities/Character';
import { CharacterStub } from '../__stubs__/CharacterFactory';
import { ICharacterRepository } from '../../src/repositories/ICharacterRepository';

export class CharacterRepositoryFake implements ICharacterRepository {
  private characterStub: CharacterStub = new CharacterStub(10);

  findByName(name: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(new Warrior(name)));
  }
  find(query: any): Promise<Character[] | any[]> {
    return jest.mocked(Promise.resolve(this.characterStub.characterCollection));
  }
  findById(id: string): Promise<Character | undefined> {
    return jest.mocked(
      Promise.resolve(this.characterStub.characterCollection[0])
    );
  }
  save(character: Character): Promise<void> {
    return Promise.resolve();
  }
}
