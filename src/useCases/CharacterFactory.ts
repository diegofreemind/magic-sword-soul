import { Character } from '../entities/Character';
import Warrior from '../entities/Warrior';
import Thief from '../entities/Thief';
import Mage from '../entities/Mage';

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
