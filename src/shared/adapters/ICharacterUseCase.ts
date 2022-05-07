import { Character } from '../../entities/Character';

export interface ICharacterUseCase {
  updateCharacterById(id: string, character: Character): Promise<void>;
  findCharacterById(id: string): Promise<Character | undefined>;
}
