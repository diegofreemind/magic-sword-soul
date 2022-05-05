import { Character } from '../../src/entities/Character';
import { Pagination } from '../../src/shared/interfaces/pagination';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactory';
import { ICharacterRepository } from '../../src/repositories/ICharacterRepository';
import { ListCharacterDTO } from '../../src/useCases/ListCharacter/ListCharacterDTO';

export class CharacterRepositoryFake implements ICharacterRepository {
  InMemoryCharacters: CharacterFactoryStub = new CharacterFactoryStub(10);

  findByName(name: string): Promise<Character | undefined> {
    return jest.mocked(Promise.resolve(this.InMemoryCharacters.collection[0]));
  }
  find(query: ListCharacterDTO, pagination?: Pagination): Promise<Character[]> {
    const result = this.InMemoryCharacters.collection.slice(0, 10);
    return jest.mocked(Promise.resolve(result));
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
