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
> {}
