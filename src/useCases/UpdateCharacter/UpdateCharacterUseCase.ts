import { ICharacterRepository } from '../../repositories/interfaces/ICharacterRepository';

export default class UpdateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(): Promise<void> {}
}
