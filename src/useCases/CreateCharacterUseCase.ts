import CharacterFactory from './CharacterFactory';
import { Character } from '../entities/Character';
import { CharacterDTO } from './CharacterDTO';

export default class CreateCharacterUseCase {
  constructor() {} // TODO: inject repository

  execute(props: CharacterDTO): Character {
    // TODO: validate already created character
    return CharacterFactory.create(props.profession, props.name);
  }
}
