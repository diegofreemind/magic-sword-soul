import { IsNumber, Min } from 'class-validator';

export class Pagination {
  @IsNumber()
  @Min(0)
  pageNumber!: number;

  @IsNumber()
  @Min(1)
  pageSize!: number;
}
