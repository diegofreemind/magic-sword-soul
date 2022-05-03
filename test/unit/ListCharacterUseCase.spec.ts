import { Character } from '../../src/entities/Character';
import { CharacterStatus } from '../../src/shared/enums/Character';
import { IFindQuery } from '../../src/repositories/ICharacterRepository';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepository';
import ListCharacterUseCase from '../../src/useCases/ListCharacter/ListCharacterUseCase';

const query: IFindQuery = {};

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new ListCharacterUseCase(characterRepositoryFake);

const { InMemoryCharacters } = characterRepositoryFake;
const characterStubList = InMemoryCharacters.collection;

describe('F2 - Listar todos os personagens já criados', () => {
  test('Deve recuperar uma lista com 10 personagens ( pagina 0 )', async () => {
    const characterList = await sut.execute(query, {
      pageNumber: 0,
      pageSize: 10,
    });

    expect(characterList).toHaveLength(10);
    expect(characterList[0]).toBeInstanceOf(Character);
  });

  test('Deve recuperar uma lista com 5 personagens ( pagina 1 )', async () => {
    jest
      .spyOn(characterRepositoryFake, 'find')
      .mockResolvedValueOnce(
        characterStubList.map((item) => item).splice(0, 5)
      );

    const characterList = await sut.execute(query, {
      pageNumber: 1,
      pageSize: 5,
    });

    expect(characterList).toHaveLength(5);
    expect(characterList[0]).toBeInstanceOf(Character);
  });

  test('Deve recuperar uma lista somente com personagens que possuem o status `dead`', async () => {
    jest
      .spyOn(characterRepositoryFake, 'find')
      .mockResolvedValueOnce(
        characterStubList.filter(
          (item) => item.getStatus() === CharacterStatus.Dead
        )
      );

    const customQuery: IFindQuery = {
      status: CharacterStatus.Dead,
    };

    const characterList = await sut.execute(customQuery, {
      pageNumber: 0,
      pageSize: 10,
    });

    expect(characterList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'dead',
        }),
      ])
    );
  });

  test('Deve recuperar uma lista somente com personagens que possuem o status `alive`', async () => {
    jest
      .spyOn(characterRepositoryFake, 'find')
      .mockResolvedValueOnce(
        characterStubList.filter(
          (item) => item.getStatus() === CharacterStatus.Alive
        )
      );

    const customQuery: IFindQuery = {
      status: CharacterStatus.Dead,
    };

    const characterList = await sut.execute(customQuery, {
      pageNumber: 0,
      pageSize: 10,
    });

    expect(characterList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'alive',
        }),
      ])
    );
  });
});
