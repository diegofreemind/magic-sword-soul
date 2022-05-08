import {
  IBattleQuery,
  IBattleUpdate,
} from '../../shared/interfaces/IPerformBattle';

import Battle from '../../entities/Battle';
import { IRepository } from './IRepository';

export interface IBattleRepository
  extends IRepository<Battle, IBattleQuery, IBattleUpdate> {}
