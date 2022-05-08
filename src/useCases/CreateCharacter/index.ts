import { characterRepository } from '../../repositories/implementations';
import CreateCharacterController from './CreateCharacterController';
import CreateCharacterUseCase from './CreateCharacterUseCase';

const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);

const createCharacterController = new CreateCharacterController(
  createCharacterUseCase
);

export {
  createCharacterController,
  createCharacterUseCase,
  characterRepository,
};
