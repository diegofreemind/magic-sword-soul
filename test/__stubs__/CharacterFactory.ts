import Chance from 'chance';
import { Character } from '../../src/entities/Character';
import { Professions } from '../../src/shared/enums/Character';
import CharacterFactory from '../../src/useCases/CreateCharacter/CharacterFactory';

const chanceGenerator = new Chance();

export class CharacterFactoryStub {
  public collection: Character[] = [];
  constructor(private quantity: number) {
    for (let x = 0; x < this.quantity; x++) {
      let characterName = chanceGenerator
        .name({ nationality: 'en' })
        .split(' ')
        .join('_');

      let characterTypes = Object.values(Professions);

      let characterProfession =
        characterTypes[Math.floor(Math.random() * characterTypes.length)];

      this.collection.push(
        CharacterFactory.create(characterProfession, characterName)
      );
    }
  }
}
