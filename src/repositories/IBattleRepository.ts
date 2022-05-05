import Battle from '../entities/Battle';
import { IBattle } from '../shared/interfaces/battle';

export interface IBattleRepository {
  save(battle: Battle): Promise<void>;
  update(id: string, payload: IBattle): Promise<void>;
  findById(id: string): Promise<Battle | undefined>;
}
