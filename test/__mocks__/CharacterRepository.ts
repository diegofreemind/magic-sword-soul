import { Character } from '../../src/entities/Character';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactory';
import {
  ICharacterRepository,
  IFindQuery,
  Pagination,
} from '../../src/repositories/ICharacterRepository';

export class CharacterRepositoryFake implements ICharacterRepository {
  InMemoryCharacters: CharacterFactoryStub = new CharacterFactoryStub(10);

  findByName(name: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(this.InMemoryCharacters.collection[0]));
  }

  find(query: IFindQuery, pagination?: Pagination): Promise<Character[]> {
    const result = this.InMemoryCharacters.collection.slice(0, 10);
    return jest.mocked(Promise.resolve(result));
  }
  findById(id: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(this.InMemoryCharacters.collection[0]));
  }
  save(character: Character): Promise<void> {
    return Promise.resolve();
  }
}
