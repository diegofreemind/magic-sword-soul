import { Character } from '../../src/entities/Character';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepository';
import { BadRequestException } from '../../src/shared/exceptions/BadRequestException';
import ListCharacterUseCase from '../../src/useCases/ListCharacter/ListCharacterUseCase';

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new ListCharacterUseCase(characterRepositoryFake);

beforeAll(() => {
  // TODO : add character generator ( stub ) : Chance
});

describe('F2 - Listar todos os personagens já criados', () => {
  test('Deve recuperar uma lista com 10 personagens', async () => {
    const pageNumber = 0;
    const pageSize = 10;
    const characterList = await sut.execute({ pageNumber, pageSize });

    expect(characterList).toHaveLength(10);
    expect(characterList[0]).toBeInstanceOf(Character);
  });

  test('Deve recuperar uma lista somente com personagens que possuem o status `dead`', async () => {});
  test('Deve recuperar uma lista somente com personagens que possuem o status `alive`', async () => {});
});
