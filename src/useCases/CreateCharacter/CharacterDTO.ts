import { IsIn, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export enum Professions {
  Warrior = 'warrior',
  Thief = 'thief',
  Mage = 'mage',
}

export enum CharacterStatus {
  Alive = 'alive',
  Dead = 'dead',
}

export class CharacterDTO {
  @IsIn(Object.values(Professions))
  readonly profession!: string;

  @IsNotEmpty()
  @MaxLength(15)
  @Matches(/^[a-zA-Z_]+$/)
  readonly name!: string;
}
