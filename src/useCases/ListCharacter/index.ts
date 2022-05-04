import CharacterRepository from '../../repositories/CharacterRepository';
import ListCharacterController from './ListCharacterController';
import ListCharacterUseCase from './ListCharacterUseCase';

const characterRepository = new CharacterRepository();
const listCharacterUseCase = new ListCharacterUseCase(characterRepository);

const listCharacterController = new ListCharacterController(
  listCharacterUseCase
);

export { listCharacterController, listCharacterUseCase };
