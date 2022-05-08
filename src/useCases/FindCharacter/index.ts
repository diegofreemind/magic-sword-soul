import { characterRepository } from '../../repositories/implementations';
import FindCharacterController from './FindCharacterController';
import FindCharacterUseCase from './FindCharacterUseCase';

const findCharacterUseCase = new FindCharacterUseCase(characterRepository);

const findCharacterController = new FindCharacterController(
  findCharacterUseCase
);

export { findCharacterController, findCharacterUseCase };
