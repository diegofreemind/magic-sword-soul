import { RoundType } from '../enums/Battle';
import { IMethodCalculate } from './IPerformBattle';

export interface IRoundLog {
  offensive?: string;
  defensive: string;
  winner?: string;
  calculatedAttack?: number;
  calculatedDamage?: number;
  defensiveCalculatedSpeed?: number;
  offensiveCalculatedSpeed?: number;
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
