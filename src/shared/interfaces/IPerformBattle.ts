import { Character } from '../../entities/Character';
import { BattleStatus } from '../enums/Battle';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';

export interface IUpdate {
  [key: string]: any;
}

export interface IBattle {
  players: Character[];
  playersQuantity: number;
  rounds?: string[];
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
  rounds?: string[];
  status?: BattleStatus;
  players?: Character[];
  starterPlayer?: string;
  playersQuantity?: number;
}

export interface IBattleState {
  battle: Battle;
  round: Round;
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

export interface IRoundState {
  calculatedAttack: number;
  calculatedDamage: number;
  executedDamage: IMethodCalculate;
}

export interface IMethodCalculate {
  id: string;
  calculated: number;
}
