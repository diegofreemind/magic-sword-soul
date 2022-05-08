import {
  IRoundQuery,
  IRoundUpdate,
} from '../../shared/interfaces/IPerformBattle';

import Round from '../../entities/Round';
import { Repository } from './Repository';

export class RoundRepository extends Repository<
  Round,
  IRoundQuery,
  IRoundUpdate
> {
  update(id: string, params: IRoundUpdate): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
