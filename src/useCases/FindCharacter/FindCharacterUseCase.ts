import { ICharacterRepository } from '../../repositories/interfaces/ICharacterRepository';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { NotFoundException } from '../../shared/exceptions/NotFoundException';

import { Character } from '../../entities/Character';
import { isUUID } from 'class-validator';
import { ICharacterMeta } from '../../shared/interfaces/ICharacter';

export default class FindCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(
    id: string,
    withLabels?: boolean
  ): Promise<ICharacterMeta | Character | undefined> {
    if (isUUID(id)) {
      const foundCharacter = await this.characterRepository.findById(id);

      if (foundCharacter) {
        const character = foundCharacter;
        const labels = foundCharacter?.labels();

        return withLabels ? { character, labels } : character;
      }

      throw new NotFoundException(`The character ${id} was not found`);
    }

    throw new BadRequestException(`The id format ${id} is not valid`);
  }
}
