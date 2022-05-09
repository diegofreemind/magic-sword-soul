import { IsIn, IsString, IsUUID, IsOptional } from 'class-validator';
import { Professions, CharacterStatus } from '../../shared/enums/Character';

export class ListCharacterDTO {
  @IsOptional()
  @IsIn(Object.values(CharacterStatus))
  status?: CharacterStatus;

  @IsOptional()
  @IsIn(Object.values(Professions))
  readonly profession?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;
}
