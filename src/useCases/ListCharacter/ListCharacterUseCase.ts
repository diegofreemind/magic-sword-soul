import {
  ICharacterRepository,
  IFindQuery,
} from '../../repositories/ICharacterRepository';

import {
  Pagination,
  DEFAULT_PAGINATION,
} from '../../shared/interfaces/pagination';

import { validatorDto } from '../../shared/validators/validatorDTO';
import { ListCharacterDTO } from './ListCharacterDTO';

export default class ListCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(
    query: IFindQuery,
    pagination: Pagination = DEFAULT_PAGINATION
  ) {
    await validatorDto(ListCharacterDTO, query);
    // TODO: move to utility -> default values ( DTO )
    return this.characterRepository.find(query, pagination);
  }
}
