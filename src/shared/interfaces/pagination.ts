// import { IsNumber, Min, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export type Pagination = {
  pageNumber: number;
  pageSize: number;
};

// export class PaginationParams {
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   @Min(0)
//   pageNumber?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   @Min(1)
//   pageSize?: number;
// }
