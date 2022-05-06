import { Character } from '../../src/entities/Character';
import { ICharacter } from '../../src/shared/interfaces/ICharacter';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactory';
import { ICharacterRepository } from '../../src/repositories/ICharacterRepository';

export class CharacterRepositoryFake implements ICharacterRepository {
  InMemoryCharacters: CharacterFactoryStub = new CharacterFactoryStub(10);

  find(query: ICharacter, pagination?: Pagination): Promise<Character[]> {
    const result = this.InMemoryCharacters.collection.slice(0, 10);
    return jest.mocked(Promise.resolve(result));
  }

  update(id: string, character: Character): Promise<void> {
    throw new Error('Method not implemented.');
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
