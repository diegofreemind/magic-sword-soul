import { Character } from '../entities/Character';

export interface ICharacterRepository {
  find(query: any): Promise<Character[]>;
  save(character: Character): Promise<void>;
  findById(id: string): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
}
