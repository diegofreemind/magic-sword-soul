import Round from '../../entities/Round';
import { BattleStatus } from '../enums/Battle';
import { Character } from '../../entities/Character';

export interface IBattle {
  id?: string;
  rounds?: Round[];
  status?: BattleStatus;
  players?: Character[];
  playersQuantity?: number;
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
