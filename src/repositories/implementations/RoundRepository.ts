import {
  IRoundQuery,
  IRoundUpdate,
} from '../../shared/interfaces/IPerformRound';

import Round from '../../entities/Round';
import { Repository } from './Repository';

export default class RoundRepository extends Repository<
  Round,
  IRoundQuery,
  IRoundUpdate
> {}
