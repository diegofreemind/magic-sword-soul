import { Character } from '../../entities/Character';
import { ICharacterUpdate } from '../interfaces/ICharacter';

export interface ICharacterUseCase {
  updateCharacterById(id: string, character: ICharacterUpdate): Promise<void>;
  findCharacterById(id: string): Promise<Character | undefined>;
}
