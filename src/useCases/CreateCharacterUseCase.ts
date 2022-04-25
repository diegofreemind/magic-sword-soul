import Warrior from '../entities/Warrior';
import Thief from '../entities/Thief';
import Mage from '../entities/Mage';

// TODO: define DTO (enum att profession) - class-validator
export type CharacterProps = {
  name: string;
  profession: string;
};

export default class CreateCharacterUseCase {
  constructor() {}

  execute(props: CharacterProps) {
    if (props.name === undefined || props.profession == undefined) {
      throw new Error('Att not defined');
    }

    switch (props.profession) {
      case 'warrior':
        return new Warrior(props.name);
      case 'thief':
        return new Thief(props.name);
      case 'mage':
        return new Mage(props.name);
    }
  }
}
