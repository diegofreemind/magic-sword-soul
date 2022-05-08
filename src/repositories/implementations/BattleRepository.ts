import Battle from '../../entities/Battle';
import { Repository } from './Repository';

import {
  IBattleQuery,
  IBattleUpdate,
} from '../../shared/interfaces/IPerformBattle';

export default class BattleRepository extends Repository<
  Battle,
  IBattleQuery,
  IBattleUpdate
> {}
