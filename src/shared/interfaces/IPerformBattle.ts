import { BattleStatus } from '../enums/Battle';
import { Character } from '../../entities/Character';

export interface IBattle {
  readonly id?: string;
  rounds?: string[];
  status?: BattleStatus;
  players?: Character[];
  playersQuantity?: number;
}

export interface IBattleState {
  status?: BattleStatus;
  lastActionPlayer?: string;
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
