import { IsUUID } from 'class-validator';
import { Character } from '../../entities/Character';
import { BattleStatus } from '../../shared/enums/Battle';

export class PerformBattleDTO {
  @IsUUID('4', { each: true })
  players!: string[];
}

export class BattleDTO {
  readonly id!: string;
  rounds?: string[];
  status?: BattleStatus;
  players?: Character[];
  starterPlayer?: string;
  playersQuantity?: number;
}
