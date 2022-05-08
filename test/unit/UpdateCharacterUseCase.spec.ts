import { ICharacterUpdate } from '../../src/shared/interfaces/ICharacter';
import UpdateCharacterUseCase from '../../src/useCases/UpdateCharacter/UpdateCharacterUseCase';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepositoryFake';
import { aliveCharacters } from '../__stubs__/PerformBattle';

const characterRepositoryFake = new CharacterRepositoryFake();

const sut = new UpdateCharacterUseCase(characterRepositoryFake);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Atualização de um personagem', () => {
  test('Deve atualizar os pontos de vida de um personagem', async () => {
    const [player] = aliveCharacters;

    const params: ICharacterUpdate = { life: player.getLife - 2 };
    await expect(sut.execute(player.getId, params)).resolves.toBeUndefined();
  });

  test('Deve retornar um erro ao tentar modificar o id de personagem', async () => {
    const [player] = aliveCharacters;

    const params = { id: 'fake_id_modified' };
    await expect(sut.execute(player.getId, params)).rejects.toThrow();
  });

  test('Deve retornar um erro ao tentar modificar o nome de personagem', async () => {
    const [player] = aliveCharacters;

    const params = { name: 'fake_name_modified' };
    await expect(sut.execute(player.getId, params)).rejects.toThrow();
  });
});
