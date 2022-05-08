import UpdateCharacterUseCase from '../../src/useCases/UpdateCharacter/UpdateCharacterUseCase';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepositoryFake';
import { aliveCharacters } from '../__stubs__/PerformBattle';

const characterRepositoryFake = new CharacterRepositoryFake();

const sut = new UpdateCharacterUseCase(characterRepositoryFake);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Atualização de um personagem', () => {
  test('Deve atualizar os pontos de vida de um personagem', () => {});
  test('Deve retornar um erro ao tentar modificar o id de personagem', () => {});
  test('Deve retornar um erro ao tentar modificar o nome de personagem', () => {});
});
