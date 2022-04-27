import { ICharacterRepository } from '../repositories/ICharacterRepository';
import { ConflictException } from '../shared/exceptions/ConflictException';
import { validatorDto } from '../shared/validators/validatorDTO';

import CharacterFactory from './CharacterFactory';
import { Character } from '../entities/Character';
import { CharacterDTO } from './CharacterDTO';

export default class CreateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(props: CharacterDTO): Promise<Character> {
    const { name, profession } = props;
    await validatorDto(CharacterDTO, props);

    const isAlreadyCreated = await this.characterRepository.find({
      name,
      profession,
    });

    console.log({ isAlreadyCreated });
    if (isAlreadyCreated.length > 0) {
      throw new ConflictException(`Character name ${name} is not available`);
    }

    // TODO: persist new Character
    return CharacterFactory.create(profession, name);
  }
}