import Round from '../../src/entities/Round';
import { IRoundRepository } from '../../src/repositories/IRoundRepository';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import { IRound } from '../../src/shared/interfaces/IPerformBattle';

export class RoundRepositoryFake implements IRoundRepository {
  save(round: Round): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Round> {
    throw new Error('Method not implemented.');
  }
  update(id: string, round: Round): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(query: IRound, pagination: Pagination): Promise<Round[]> {
    throw new Error('Method not implemented.');
  }
}
