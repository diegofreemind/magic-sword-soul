import Battle from '../../src/entities/Battle';
import { IBattleRepository } from '../../src/repositories/interfaces/IBattleRepository';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import {
  IBattleUpdate,
  IBattleQuery,
} from '../../src/shared/interfaces/IPerformBattle';

export class BattleRepositoryFake implements IBattleRepository {
  save(resource: Battle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Battle | undefined> {
    throw new Error('Method not implemented.');
  }
  update(id: string, params: IBattleUpdate): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(query: IBattleQuery, pagination: Pagination): Promise<Battle[]> {
    throw new Error('Method not implemented.');
  }
}
