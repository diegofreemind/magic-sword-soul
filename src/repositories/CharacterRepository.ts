import { Character } from '../entities/Character';
import { ICharacterRepository } from './ICharacterRepository';

export default class CharacterRepository implements ICharacterRepository {
  private charactersInMemory: Character[] = [];

  save(character: Character): Promise<void> {
    this.charactersInMemory.push(character);
    return Promise.resolve();
  }

  find(query: any): Promise<Character[]> | undefined {
    if (query?.name && query?.profession) {
      return Promise.resolve(
        this.charactersInMemory.filter((current) => {
          if (
            current.getName == query.name &&
            current.getProfession == query.profession
          ) {
            return current;
          }
        })
      );
    }
  }

  findById(id: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }
}
