import { CharacterRepositoryFake } from '../__mocks__/CharacterRepository';
import ListCharacterUseCase from '../../src/useCases/ListCharacter/ListCharacterUseCase';

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new ListCharacterUseCase(characterRepositoryFake);

beforeAll(() => {
  // TODO : add character generator ( stub ) : Chance
});

describe('F2 - Listar todos os personagens já criados', () => {
  test('Recupera uma lista com 10 personagens', async () => {
    const characterList = await sut.execute(0, 10);
    expect(characterList).toHaveLength(10);
  });
});
