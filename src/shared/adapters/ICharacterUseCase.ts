import { Character } from '../../entities/Character';
import { ICharacterMeta } from '../interfaces/ICharacter';
import { ICharacterUpdate } from '../interfaces/ICharacter';

export interface ICharacterUseCase {
  updateCharacterById(id: string, character: ICharacterUpdate): Promise<void>;
  findCharacterById(
    id: string
  ): Promise<ICharacterMeta | Character | undefined>;
}
