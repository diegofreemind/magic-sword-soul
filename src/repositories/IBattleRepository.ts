import Battle from '../entities/Battle';
import { IBattle } from '../shared/interfaces/IPerformBattle';
import { Pagination } from '../shared/interfaces/IPagination';

export interface IBattleRepository {
  save(battle: Battle): Promise<void>;
  update(id: string, battle: Battle): Promise<void>;
  findById(id: string): Promise<Battle | undefined>;
  find(query: IBattle, pagination: Pagination): Promise<Battle[]>;
}
