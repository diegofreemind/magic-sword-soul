import { Character } from '../entities/Character';
import { ICharacterRepository } from './ICharacterRepository';

export default class CharacterRepository implements ICharacterRepository {
  private charactersInMemory: Character[] = [];

  save(character: Character): Promise<void> {
    this.charactersInMemory.push(character);
    return Promise.resolve();
  }

  find(query: { name: string; profession: string }): Promise<Character[]> {
    const result = this.charactersInMemory.filter((current) => {
      if (
        current.getName == query.name &&
        current.getProfession == query.profession
      ) {
        return current;
      }
    });
    return Promise.resolve(result);
  }

  findById(id: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<Character | undefined> {
    throw new Error('Method not implemented.');
  }
}
