import { Character } from '../entities/Character';
import { ICharacter } from '../shared/interfaces/ICharacter';
import { Pagination } from '../shared/interfaces/IPagination';

export interface ICharacterRepository {
  save(character: Character): Promise<void>;
  findById(id: string): Promise<Character | undefined>;
  update(id: string, character: Character): Promise<void>;
  find(query: ICharacter, pagination: Pagination): Promise<Character[]>;
}
