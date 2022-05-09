import { Character } from '../../entities/Character';
import { BattleStatus } from '../enums/Battle';
import { IRoundSummary } from './IPerformRound';

import Battle from '../../entities/Battle';
import Round from '../../entities/Round';

export interface IUpdate {
  [key: string]: any;
}

export interface IBattle {
  players: Character[];
  playersQuantity: number;
  rounds?: IRoundSummary[];
  starterPlayer?: string;
}

export interface IBattleQuery {
  readonly id?: string;
  rounds?: string[];
  status?: BattleStatus;
  players?: Character[];
  playersQuantity?: number;
}

export interface IBattleUpdate {
  rounds?: IRoundSummary[];
  status?: BattleStatus;
  players?: Character[];
  starterPlayer?: string;
  playersQuantity?: number;
}

export interface IBattleState {
  battle: Battle;
  round: Round;
}

export interface IMethodCalculate {
  id: string;
  calculated: number;
}
