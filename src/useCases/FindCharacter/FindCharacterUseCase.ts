import { ICharacterRepository } from '../../repositories/ICharacterRepository';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { Character } from '../../entities/Character';
import { isUUID } from 'class-validator';

export default class FindCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(id: string): Promise<Character | undefined> {
    if (isUUID(id)) {
      return this.characterRepository.findById(id);
    }

    throw new BadRequestException(`The id format ${id} is not valid`);
  }
}
