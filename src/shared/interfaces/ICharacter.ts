import { Character } from '../../entities/Character';
import { CharacterStatus, Professions } from '../enums/Character';

export interface ICharacterQuery {
  status?: CharacterStatus;
  profession?: Professions;
  readonly name?: string;
  readonly id?: string;
}

export interface ICharacterProps {
  id?: string;
  name: string;
  profession: Professions;
  status?: CharacterStatus;
}

export interface ICharacterMeta {
  character: Character;
  labels: { attack: string; speed: string };
}

export interface ICharacterUpdate {
  [key: string]: any;
}
