import { IsIn, IsNotEmpty, Matches, MaxLength } from 'class-validator';
import { Professions } from '../../shared/enums/Character';

export class CreateCharacterDTO {
  @IsNotEmpty()
  @IsIn(Object.values(Professions))
  readonly profession!: string;

  @IsNotEmpty()
  @MaxLength(15)
  @Matches(/^[a-zA-Z_]+$/)
  readonly name!: string;
}
