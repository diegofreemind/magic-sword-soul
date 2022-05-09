import FindCharacterUseCase from '../../useCases/FindCharacter/FindCharacterUseCase';
import UpdateCharacterUseCase from '../../useCases/UpdateCharacter/UpdateCharacterUseCase';

import { characterRepository } from '../../repositories/implementations';
import { ICharacterUpdate } from '../../shared/interfaces/ICharacter';
import { ICharacterMeta } from '../../shared/interfaces/ICharacter';
import { ICharacterUseCase } from '../adapters/ICharacterUseCase';
import { Character } from '../../entities/Character';

const findCharacterUseCase = new FindCharacterUseCase(characterRepository);
const updateCharacterUseCase = new UpdateCharacterUseCase(characterRepository);

export class CharacterUseCaseAdapter implements ICharacterUseCase {
  updateCharacterById(id: string, character: ICharacterUpdate): Promise<void> {
    return updateCharacterUseCase.execute(id, character);
  }
  findCharacterById(
    id: string
  ): Promise<ICharacterMeta | Character | undefined> {
    return findCharacterUseCase.execute(id);
  }
}
