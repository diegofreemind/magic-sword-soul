import Round from '../entities/Round';
import { IRound } from '../shared/interfaces/IPerformBattle';
import { Pagination } from '../shared/interfaces/IPagination';

export interface IRoundRepository {
  save(round: Round): Promise<void>;
  findById(id: string): Promise<Round | undefined>;
  update(id: string, round: Round): Promise<void>;
  find(query: IRound, pagination: Pagination): Promise<Round[]>;
}
