import Mage from '../../entities/Mage';
import Warrior from '../../entities/Warrior';
import { Character } from '../../entities/Character';
import { ICharacterRepository } from '../ICharacterRepository';

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
    throw new Error('Method not implemented.');
  }
}
