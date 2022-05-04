import Chance from 'chance';
import { Character } from '../../src/entities/Character';
import { CharacterStatus, Professions } from '../../src/shared/enums/Character';
import CharacterFactory from '../../src/useCases/CreateCharacter/CharacterFactory';

const chanceGenerator = new Chance();

export class CharacterFactoryStub {
  public collection: Character[] = [];
  constructor(private quantity: number, status?: CharacterStatus) {
    for (let x = 0; x < this.quantity; x++) {
      const { characterName, characterStatus, characterProfession } =
        this.genCharacterInfo();

      this.collection.push(
        CharacterFactory.create({
          name: characterName,
          profession: characterProfession,
          status: !status ? characterStatus : status,
        })
      );
    }
  }

  private genCharacterInfo() {
    const characterName = chanceGenerator
      .name({ nationality: 'en' })
      .split(' ')
      .join('_');

    const characterTypes = Object.values(Professions);
    const statusTypes = Object.values(CharacterStatus);

    const characterStatus = this.getRandomItem(statusTypes);
    const characterProfession = this.getRandomItem(characterTypes);

    return { characterName, characterStatus, characterProfession };
  }

  private getRandomItem(collection: Array<any>) {
    return collection[Math.floor(Math.random() * collection.length)];
  }
}
