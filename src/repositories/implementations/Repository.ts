import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from '../../entities/BaseEntity';

import { Pagination } from '../../shared/interfaces/IPagination';
import { IUpdate } from '../../shared/interfaces/IPerformBattle';
import { IRepository } from '../interfaces/IRepository';

export abstract class Repository<T extends BaseEntity, Q, U extends IUpdate>
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

  update(id: string, params: U): Promise<void> {
    const target = this.InMemoryResource.find((battle) => battle.getId === id);
    const index = this.InMemoryResource.indexOf(target!);

    const openEntity = target as any;

    Object.keys(params).forEach((key) => {
      openEntity[key] = params[key];
    });

    this.InMemoryResource[index] = openEntity as T;

    return Promise.resolve();
  }

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

  protected updateByProps(resource: T, params: U) {
    const literalResource = instanceToPlain(resource);
    const updateKeys = Object.keys(params);

    updateKeys.map((key) => {
      literalResource[key] = Object(params)[key];
    });

    return literalResource;
  }

  protected filterByProps(resource: T, query: Q): Boolean {
    const literalResource = instanceToPlain(resource);
    const searchKeys = Object.keys(query);

    const mappedProps = searchKeys.filter(
      (key) => literalResource[key] === Object(query)[key]
    );

    return mappedProps.length === searchKeys.length;
  }
}
