import { Character } from '../../entities/Character';
import { ICharacterRepository } from '../../repositories/ICharacterRepository';
import { ConflictException } from '../../shared/exceptions/ConflictException';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { CharacterDTO } from './CharacterDTO';
import CharacterFactory from './CharacterFactory';

export default class CreateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(props: CharacterDTO): Promise<Character> {
    const { name, profession } = props;
    await validatorDto(CharacterDTO, props);

    const isAlreadyCreated = await this.characterRepository.find({
      name,
      profession,
    });

    if (isAlreadyCreated?.length > 0) {
      throw new ConflictException(
        `Identifier ${name} for ${profession} is not available`
      );
    }

    const newCharacter = CharacterFactory.create(profession, name);
    await this.characterRepository.save(newCharacter);
    return newCharacter;
  }
}
