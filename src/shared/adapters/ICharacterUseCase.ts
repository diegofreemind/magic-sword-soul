import { Character } from '../../entities/Character';

export interface ICharacterUseCase {
  updateCharacterById(id: string): Promise<void>;
  findCharacterById(id: string): Promise<Character | undefined>;
}
