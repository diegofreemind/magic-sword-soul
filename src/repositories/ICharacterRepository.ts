import { Character } from '../entities/Character';
import { CharacterStatus } from '../shared/enums/Character';

export type Pagination = {
  pageNumber: number;
  pageSize: number;
};

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

  // TODO: review requirements
  find(query?: IFindQuery, pagination?: Pagination): Promise<Character[]>;
}
