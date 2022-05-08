import { Character } from '../../src/entities/Character';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactoryStub';
import {
  ICharacterQuery,
  ICharacterUpdate,
} from '../../src/shared/interfaces/ICharacter';
import { ICharacterRepository } from '../../src/repositories/interfaces/ICharacterRepository';

export class CharacterRepositoryFake implements ICharacterRepository {
  InMemoryCharacters: CharacterFactoryStub = new CharacterFactoryStub(20);

  find(query: ICharacterQuery, pagination?: Pagination): Promise<Character[]> {
    const result = this.InMemoryCharacters.collection.slice(0, 10);
    return jest.mocked(Promise.resolve(result));
  }

  update(id: string, character: ICharacterUpdate): Promise<void> {
    return Promise.resolve();
  }

  findById(id: string): Promise<Character | undefined> {
    const { collection } = this.InMemoryCharacters;

    const targetItem = collection.find((c) => c.getId === id);

    const character = targetItem
      ? targetItem
      : collection[Math.floor(Math.random() * collection.length)];

    return jest.mocked(Promise.resolve(character));
  }

  save(character: Character): Promise<void> {
    return Promise.resolve();
  }
}
