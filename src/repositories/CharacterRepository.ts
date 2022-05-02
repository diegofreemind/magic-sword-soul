import { Character } from '../entities/Character';
import { instanceToPlain } from 'class-transformer';
import { IFindQuery, Pagination } from './ICharacterRepository';
import { ICharacterRepository } from './ICharacterRepository';

export default class CharacterRepository implements ICharacterRepository {
  // TODO: convert to plain objet before?
  private InMemoryCharacters: Character[] = [];

  save(character: Character): Promise<void> {
    this.InMemoryCharacters.push(character);
    return Promise.resolve();
  }

  find(query: IFindQuery, pagination?: Pagination): Promise<Character[]> {
    // TODO: filter by equality -> lodash
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
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }

  private filterByProps(character: Character, query: IFindQuery) {
    const literalCharacter = instanceToPlain(character);
    const searchKeys = Object.keys(query);

    const mappedProps = searchKeys.filter(
      (key) => literalCharacter[key] === Object(query)[key]
    );

    return mappedProps.length === searchKeys.length;
  }
}
