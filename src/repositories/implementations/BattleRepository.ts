import {
  IBattleQuery,
  IBattleUpdate,
} from '../../shared/interfaces/IPerformBattle';

import Battle from '../../entities/Battle';
import { Repository } from './Repository';

export class BattleRepository extends Repository<
  Battle,
  IBattleQuery,
  IBattleUpdate
> {
  update(id: string, params: IBattleUpdate): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
