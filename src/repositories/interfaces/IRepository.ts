import { Pagination } from '../../shared/interfaces/IPagination';

export interface IRepository<T, Q, U> {
  save(resource: T): Promise<void>;
  findById(id: string): Promise<T | undefined>;
  update(id: string, params: U): Promise<void>;
  find(query: Q, pagination: Pagination): Promise<T[]>;
}
