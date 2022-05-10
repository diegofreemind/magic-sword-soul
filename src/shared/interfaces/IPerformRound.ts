import { RoundType } from '../enums/Battle';
import { IMethodCalculate } from './IPerformBattle';

export interface IRoundLog {
  offensivePlayerName?: string;
  defensivePlayerName?: string;
  winnerPlayerName?: string;
  calculatedAttack?: number;
  calculatedDamage?: number;
  offensiveCalculatedSpeed?: number;
  defensiveCalculatedSpeed?: number;
}

export interface IRoundQuery {
  readonly id?: string;
  readonly battleId?: string;
  timestamp?: Date;
  offensive?: string;
  defensive?: string;
  calculatedAttack?: number;
  calculatedSpeed?: number;
  calculatedDamage?: number;
}

export interface IRoundUpdate {
  offensive?: string;
  defensive?: string;
  calculatedAttack?: number;
  calculatedSpeed?: number;
  calculatedDamage?: number;
}

export interface IRoundSummary {
  id: string;
  type: RoundType;
}

export interface IRoundState {
  calculatedAttack: number;
  calculatedDamage: number;
  executedDamage: IMethodCalculate;
}
