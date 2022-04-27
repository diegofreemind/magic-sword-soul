import CreateCharacterController from './CreateCharacterController';
import CreateCharacterUseCase from './CreateCharacterUseCase';

// TODO: inject repository
// const charactersRepository = new CharactersRepository();
const createCharacterUseCase = new CreateCharacterUseCase();
const createCharacterController = new CreateCharacterController(
  createCharacterUseCase
);

export { createCharacterController, createCharacterUseCase };
