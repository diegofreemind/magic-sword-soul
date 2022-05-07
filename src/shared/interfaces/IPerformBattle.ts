import { Character } from '../../entities/Character';
import { BattleStatus } from '../enums/Battle';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';

export interface IBattle {
  readonly id?: string;
  rounds?: string[];
  status?: BattleStatus;
  players?: Character[];
  playersQuantity?: number;
}

export interface IBattleState {
  battle: Battle;
  round: Round;
}

export interface IRoundState {
  calculatedAttack: number;
  calculatedDamage: number;
  executedDamage: IMethodCalculate;
}

export interface IRound {
  id: string;
  battleId: string;
  timestamp: Date;
  offensive: string;
  defensive: string;
  calculatedAttack: number;
  calculatedSpeed: number;
  calculatedDamage: number;
}

export interface IMethodCalculate {
  id: string;
  calculated: number;
}
