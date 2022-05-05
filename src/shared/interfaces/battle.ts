import Round from '../../entities/Round';
import { BattleStatus } from '../enums/Battle';
import { Character } from '../../entities/Character';

interface IBattle {
  id?: string;
  rounds?: Round[];
  status?: BattleStatus;
  players: Character[];
  playersQuantity: number;
}

interface IRound {
  id: string;
  battleId: string;
  timestamp: Date;
  offensive: string;
  defensive: string;
  calculatedAttack: number;
  calculatedSpeed: number;
  calculatedDamage: number;
}
