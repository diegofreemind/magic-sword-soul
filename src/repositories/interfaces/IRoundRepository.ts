import Round from '../../entities/Round';
import { IRepository } from './../interfaces/IRepository';
import {
  IRoundQuery,
  IRoundUpdate,
} from '../../shared/interfaces/IPerformRound';

export interface IRoundRepository
  extends IRepository<Round, IRoundQuery, IRoundUpdate> {}
