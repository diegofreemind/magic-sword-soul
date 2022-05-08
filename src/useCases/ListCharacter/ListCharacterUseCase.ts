import { ICharacterRepository } from '../../repositories/interfaces/ICharacterRepository';
import { DEFAULT_PAGINATION } from '../../shared/constants/pagination';
import { Pagination } from '../../shared/interfaces/IPagination';

import { isNotEmptyObject } from 'class-validator';
import { ListCharacterDTO } from './ListCharacterDTO';
import { ICharacterQuery } from '../../shared/interfaces/ICharacter';
import { validatorDto } from '../../shared/validators/validatorDTO';

export default class ListCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(
    query: ListCharacterDTO,
    pagination: Pagination = DEFAULT_PAGINATION
  ) {
    if (isNotEmptyObject(query)) {
      await validatorDto(ListCharacterDTO, query);
    }

    return this.characterRepository.find(query as ICharacterQuery, pagination);
  }
}
