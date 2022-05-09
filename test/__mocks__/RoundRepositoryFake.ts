import Round from '../../src/entities/Round';
import { IRoundRepository } from '../../src/repositories/interfaces/IRoundRepository';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import {
  IRoundUpdate,
  IRoundQuery,
} from '../../src/shared/interfaces/IPerformBattle';

export class RoundRepositoryFake implements IRoundRepository {
  save(resource: Round): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Round | undefined> {
    throw new Error('Method not implemented.');
  }
  update(id: string, params: IRoundUpdate): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(query: IRoundQuery, pagination: Pagination): Promise<Round[]> {
    throw new Error('Method not implemented.');
  }
}
