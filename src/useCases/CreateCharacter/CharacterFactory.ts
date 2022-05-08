import Mage from '../../entities/Mage';
import Thief from '../../entities/Thief';
import Warrior from '../../entities/Warrior';
import { Character } from '../../entities/Character';
import { ICharacterProps } from '../../shared/interfaces/ICharacter';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';

export default class CharacterFactory {
  static create(props: ICharacterProps): Character {
    const { profession, name } = props;
    switch (profession) {
      case 'warrior':
        return new Warrior(name, props.id, props.status);
      case 'thief':
        return new Thief(name, props.id, props.status);
      case 'mage':
        return new Mage(name, props.id, props.status);
      default:
        throw new BadRequestException('Character profession not found');
    }
  }
}
