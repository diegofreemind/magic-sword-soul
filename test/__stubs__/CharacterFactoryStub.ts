import { Character } from '../../src/entities/Character';
import { buildCharacter } from '../../src/config/generator';
import { CharacterStatus } from '../../src/shared/enums/Character';

export class CharacterFactoryStub {
  public collection: Character[] = [];
  constructor(private quantity: number, status?: CharacterStatus) {
    for (let x = 0; x < this.quantity; x++) {
      this.collection.push(buildCharacter(status));
    }
  }
}
