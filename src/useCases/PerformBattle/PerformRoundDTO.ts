import { IsUUID } from 'class-validator';

export class PerformRoundDTO {
  @IsUUID('4')
  offensive!: string;

  @IsUUID('4')
  defensive!: string;

  @IsUUID('4')
  battleId!: string;
}
