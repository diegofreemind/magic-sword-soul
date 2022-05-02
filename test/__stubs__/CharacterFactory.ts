import Chance from 'chance';
import { Character } from '../../src/entities/Character';
import { Professions } from '../../src/useCases/CreateCharacter/CharacterDTO';
import CharacterFactory from '../../src/useCases/CreateCharacter/CharacterFactory';

const chanceGenerator = new Chance();

export class CharacterStub {
  public characterCollection: Character[] = [];
  constructor(private quantity: number) {
    for (let x = 0; x < this.quantity; x++) {
      let characterName = chanceGenerator
        .name({ nationality: 'en' })
        .split(' ')
        .join('_');

      let characterTypes = Object.values(Professions);

      let characterProfession =
        characterTypes[Math.floor(Math.random() * characterTypes.length)];

      this.characterCollection.push(
        CharacterFactory.create(characterProfession, characterName)
      );
    }
  }
}
