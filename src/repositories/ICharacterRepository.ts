import { Character } from '../entities/Character';
import { Pagination } from '../shared/interfaces/pagination';
import { CharacterStatus } from '../shared/enums/Character';

export interface IFindQuery {
  id?: string;
  name?: string;
  profession?: string;
  status?: CharacterStatus;
}

export interface ICharacterRepository {
  save(character: Character): Promise<void>;
  findById(id: string): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
  find(query: IFindQuery, pagination: Pagination): Promise<Character[]>;
}
