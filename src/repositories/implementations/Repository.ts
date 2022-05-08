import { BaseEntity } from '../../entities/BaseEntity';
import { instanceToPlain } from 'class-transformer';

import { Pagination } from '../../shared/interfaces/IPagination';
import { IRepository } from '../interfaces/IRepository';

export abstract class Repository<T extends BaseEntity, Q, U>
  implements IRepository<T, Q, U>
{
  protected InMemoryResource: T[] = [];

  save(entity: T): Promise<void> {
    this.InMemoryResource.push(entity);
    return Promise.resolve();
  }

  findById(id: string): Promise<T | undefined> {
    return Promise.resolve(
      this.InMemoryResource.find((resource) => resource.getId === id)
    );
  }

  abstract update(id: string, params: U): Promise<void>;

  find(query: Q, pagination?: Pagination): Promise<T[]> {
    const queryResult = this.InMemoryResource.filter((resource) =>
      this.filterByProps(resource, query)
    );

    if (pagination) {
      const { pageNumber, pageSize } = pagination;

      const skip = pageNumber * pageSize;
      const limit = pageNumber * pageSize + pageSize;

      const slicedResult = queryResult.slice(skip, limit);

      return Promise.resolve(slicedResult);
    }

    return Promise.resolve(queryResult);
  }

  private filterByProps(resource: T, query: Q): Boolean {
    const literalResource = instanceToPlain(resource);
    const searchKeys = Object.keys(query);

    const mappedProps = searchKeys.filter(
      (key) => literalResource[key] === Object(query)[key]
    );

    return mappedProps.length === searchKeys.length;
  }
}
