import { ICharacterRepository } from '../../repositories/ICharacterRepository';

export default class ListCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(pageNumber: number, pageSize: number) {
    return this.characterRepository.find({});
  }
}
