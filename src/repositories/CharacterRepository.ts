import { Character } from '../entities/Character';
import { instanceToPlain } from 'class-transformer';
import { Pagination } from '../shared/interfaces/pagination';
import { ICharacterRepository } from './ICharacterRepository';
import { ListCharacterDTO } from '../useCases/ListCharacter/ListCharacterDTO';

export default class CharacterRepository implements ICharacterRepository {
  private InMemoryCharacters: Character[] = [];

  save(character: Character): Promise<void> {
    this.InMemoryCharacters.push(character);
    return Promise.resolve();
  }

  find(query: ListCharacterDTO, pagination: Pagination): Promise<Character[]> {
    const queryResult = this.InMemoryCharacters.filter((character) =>
      this.filterByProps(character, query)
    );

    console.log({ pagination });

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

  private filterByProps(
    character: Character,
    query: ListCharacterDTO
  ): Boolean {
    const literalCharacter = instanceToPlain(character);
    const searchKeys = Object.keys(query);

    const mappedProps = searchKeys.filter(
      (key) => literalCharacter[key] === Object(query)[key]
    );

    return mappedProps.length === searchKeys.length;
  }
}
