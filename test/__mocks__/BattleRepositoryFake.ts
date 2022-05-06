import Battle from '../../src/entities/Battle';
import { IBattleRepository } from '../../src/repositories/IBattleRepository';
import { Pagination } from '../../src/shared/interfaces/IPagination';
import { IBattle } from '../../src/shared/interfaces/IPerformBattle';

export class BattleRepositoryFake implements IBattleRepository {
  find(query: IBattle, pagination: Pagination): Promise<Battle[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, payload: Battle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  save(battle: Battle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Battle> {
    throw new Error('Method not implemented.');
  }
}
