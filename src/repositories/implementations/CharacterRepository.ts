import { Character } from '../../entities/Character';

import {
  ICharacterQuery,
  ICharacterUpdate,
} from '../../shared/interfaces/ICharacter';
import { Repository } from './Repository';

export default class CharacterRepository extends Repository<
  Character,
  ICharacterQuery,
  ICharacterUpdate
> {
  update(id: string, params: ICharacterUpdate): Promise<void> {
    const target = this.InMemoryResource.find(
      (character) => character.getId === id
    );
    if (target) {
      target.setLife = params.life;
    }
    return Promise.resolve();
  }
}
