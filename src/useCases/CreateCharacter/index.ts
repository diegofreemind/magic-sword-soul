import CreateCharacterController from '../../controllers/CreateCharacterController';
import CharacterRepository from '../../repositories/CharacterRepository';
import CreateCharacterUseCase from './CreateCharacterUseCase';

const characterRepository = new CharacterRepository();
const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);

const createCharacterController = new CreateCharacterController(
  createCharacterUseCase
);

export { createCharacterController, createCharacterUseCase };
