import { IsInt, Min } from 'class-validator';

export class UpdateCharacterDTO {
  @IsInt()
  @Min(0)
  life?: number;
}
