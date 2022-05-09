import { ICharacterRepository } from '../../repositories/interfaces/ICharacterRepository';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { Character } from '../../entities/Character';
import { isUUID } from 'class-validator';
import { NotFoundException } from '../../shared/exceptions/NotFoundException';

export default class FindCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(id: string): Promise<Character | undefined> {
    if (isUUID(id)) {
      const foundCharacter = await this.characterRepository.findById(id);

      if (foundCharacter) {
        return foundCharacter;
      }

      throw new NotFoundException(`The character ${id} was not found`);
    }

    throw new BadRequestException(`The id format ${id} is not valid`);
  }
}
