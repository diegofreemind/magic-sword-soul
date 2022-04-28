import CharacterRepository from '../repositories/CharacterRepository';
import CreateCharacterController from './CreateCharacterController';
import CreateCharacterUseCase from './CreateCharacterUseCase';

const characterRepository = new CharacterRepository();
const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);

const createCharacterController = new CreateCharacterController(
  createCharacterUseCase
);

export { createCharacterController, createCharacterUseCase };
