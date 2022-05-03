// import { IsNumber, Min, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export const DEFAULT_PAGINATION: Pagination = { pageNumber: 0, pageSize: 10 };

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
