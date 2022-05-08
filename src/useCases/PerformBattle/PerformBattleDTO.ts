import { IsUUID } from 'class-validator';

export class PerformBattleDTO {
  @IsUUID('4', { each: true })
  readonly players!: string[];
}
