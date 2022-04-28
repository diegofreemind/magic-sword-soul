import { Character } from '../../entities/Character';
import Mage from '../../entities/Mage';
import Thief from '../../entities/Thief';
import Warrior from '../../entities/Warrior';

export default class CharacterFactory {
  static create(profession: string, name: string): Character {
    switch (profession) {
      case 'warrior':
        return new Warrior(name);
      case 'thief':
        return new Thief(name);
      case 'mage':
        return new Mage(name);
    }
    throw new Error('Character profession not found');
  }
}
