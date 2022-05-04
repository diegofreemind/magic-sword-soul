import { Character } from '../entities/Character';
import { Pagination } from '../shared/interfaces/pagination';
import { CharacterStatus } from '../shared/enums/Character';
import { ListCharacterDTO } from '../useCases/ListCharacter/ListCharacterDTO';

export interface ICharacterRepository {
  save(character: Character): Promise<void>;
  findById(id: string): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
  find(query: ListCharacterDTO, pagination: Pagination): Promise<Character[]>;
}
