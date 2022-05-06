import { CharacterStatus, Professions } from '../enums/Character';

export interface ICharacter {
  status?: string; // CharacterStatus;
  profession: string; //Professions;
  readonly name?: string;
  readonly id?: string;
}
