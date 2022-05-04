import { ICharacterRepository } from '../../repositories/ICharacterRepository';
import { DEFAULT_PAGINATION } from '../../shared/constants/pagination';
import { Pagination } from '../../shared/interfaces/pagination';

import { isNotEmptyObject } from 'class-validator';
import { ListCharacterDTO } from './ListCharacterDTO';
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

    return this.characterRepository.find(query, pagination);
  }
}
