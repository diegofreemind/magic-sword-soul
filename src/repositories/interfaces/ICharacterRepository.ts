import {
  ICharacterQuery,
  ICharacterUpdate,
} from '../../shared/interfaces/ICharacter';

import { Character } from '../../entities/Character';
import { IRepository } from './IRepository';

export interface ICharacterRepository
  extends IRepository<Character, ICharacterQuery, ICharacterUpdate> {}
