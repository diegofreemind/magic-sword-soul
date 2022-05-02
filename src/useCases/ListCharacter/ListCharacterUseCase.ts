import {
  ICharacterRepository,
  IFindQuery,
  Pagination,
} from '../../repositories/ICharacterRepository';

export default class ListCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(pagination: Pagination, query?: IFindQuery) {
    return this.characterRepository.find(query, pagination);
  }
}
