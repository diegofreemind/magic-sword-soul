import { IsIn, IsString, IsUUID } from 'class-validator';
import { Professions, CharacterStatus } from '../../shared/enums/Character';

export class FindCharacterDTO {
  @IsIn(Object.values(CharacterStatus))
  status?: CharacterStatus;

  @IsIn(Object.values(Professions))
  readonly profession?: string;

  @IsString()
  readonly name?: string;

  @IsUUID()
  readonly id?: string;
}
