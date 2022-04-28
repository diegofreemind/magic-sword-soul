import Mage from '../../src/entities/Mage';
import Warrior from '../../src/entities/Warrior';
import { Character } from '../../src/entities/Character';
import { ICharacterRepository } from '../../src/repositories/ICharacterRepository';

export class CharacterRepositoryFake implements ICharacterRepository {
  findByName(name: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(new Warrior(name)));
  }
  find(query: any): Promise<Character[] | any[]> {
    const stubCharacterList = [new Warrior('Fgje Sdrt'), new Mage('Khgt Asdd')];
    return jest.mocked(Promise.resolve(stubCharacterList));
  }
  findById(id: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(new Warrior('Fgje Sdrt')));
  }
  save(character: Character): Promise<void> {
    return Promise.resolve();
  }
}
