import CharacterRepository from '../../repositories/CharacterRepository';
import FindCharacterController from './FindCharacterController';
import FindCharacterUseCase from './FindCharacterUseCase';

const characterRepository = new CharacterRepository();
const findCharacterUseCase = new FindCharacterUseCase(characterRepository);

const findCharacterController = new FindCharacterController(
  findCharacterUseCase
);

export { findCharacterController, findCharacterUseCase };
