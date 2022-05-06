import { Character } from '../entities/Character';
import { instanceToPlain } from 'class-transformer';
import { ICharacter } from '../shared/interfaces/ICharacter';
import { Pagination } from '../shared/interfaces/IPagination';
import { ICharacterRepository } from './ICharacterRepository';

export default class CharacterRepository implements ICharacterRepository {
  private InMemoryCharacters: Character[] = [];

  save(character: Character): Promise<void> {
    this.InMemoryCharacters.push(character);
    return Promise.resolve();
  }

  update(id: string, character: Character): Promise<void> {
    throw new Error('Method not implemented.');
  }

  find(query: ICharacter, pagination: Pagination): Promise<Character[]> {
    const queryResult = this.InMemoryCharacters.filter((character) =>
      this.filterByProps(character, query)
    );

    if (pagination) {
      const { pageNumber, pageSize } = pagination;
      const sliced = queryResult.slice(pageNumber, pageNumber * pageSize);
      return Promise.resolve(sliced);
    }

    return Promise.resolve(queryResult);
  }

  findById(id: string): Promise<Character | undefined> {
    return Promise.resolve(
      this.InMemoryCharacters.find((character) => character.getId === id)
    );
  }

  private filterByProps(character: Character, query: ICharacter): Boolean {
    const literalCharacter = instanceToPlain(character);
    const searchKeys = Object.keys(query);

    const mappedProps = searchKeys.filter(
      (key) => literalCharacter[key] === Object(query)[key]
    );

    return mappedProps.length === searchKeys.length;
  }
}
