import { characterRepository } from '../../repositories/implementations';
import ListCharacterController from './ListCharacterController';
import ListCharacterUseCase from './ListCharacterUseCase';

const listCharacterUseCase = new ListCharacterUseCase(characterRepository);

const listCharacterController = new ListCharacterController(
  listCharacterUseCase
);

export { listCharacterController, listCharacterUseCase };
