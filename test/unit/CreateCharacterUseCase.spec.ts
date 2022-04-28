import { CharacterRepositoryFake } from '../__mocks__/CharacterRepository';
import CreateCharacterUseCase from '../../src/useCases/CreateCharacterUseCase';
import CharacterFactory from '../../src/useCases/CharacterFactory';
import { CharacterDTO } from '../../src/useCases/CharacterDTO';
import Warrior from '../../src/entities/Warrior';
import Thief from '../../src/entities/Thief';
import Mage from '../../src/entities/Mage';

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new CreateCharacterUseCase(characterRepositoryFake);

const repositorySpy = jest.spyOn(characterRepositoryFake, 'find');
const factorySpy = jest.spyOn(CharacterFactory, 'create');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Validações sobre o caso de uso CreateCharacter', () => {
  test('Cria um novo personagem Warrior ao receber os parâmetros esperados', async () => {
    const warriorProps: CharacterDTO = {
      name: 'Gusnmg Hujn',
      profession: 'warrior',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const warrior = await sut.execute(warriorProps);
    expect(warrior).toBeInstanceOf(Warrior);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Cria um novo personagem Thief ao receber os parâmetros esperados', async () => {
    const thiefProps: CharacterDTO = {
      name: 'Fytr Hujn',
      profession: 'thief',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const thief = await sut.execute(thiefProps);
    expect(thief).toBeInstanceOf(Thief);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Cria um novo personagem Mage ao receber os parâmetros esperados', async () => {
    const mageProps: CharacterDTO = {
      name: 'Dangalf Hujn',
      profession: 'mage',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const mage = await sut.execute(mageProps);
    expect(mage).toBeInstanceOf(Mage);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro ao receber os parâmetros incorretos', async () => {
    await expect(() => sut.execute({} as CharacterDTO)).rejects.toThrow();
    expect(repositorySpy).toHaveBeenCalledTimes(0);
  });

  test('Deve retornar um erro ao receber uma profissão desconhecida', async () => {
    await expect(() =>
      sut.execute({ name: 'Dangalf', profession: 'witcher' } as any)
    ).rejects.toThrow();

    // TODO: align with DTO validation on controller
    expect(repositorySpy).toHaveBeenCalledTimes(0);
  });

  test('Deve retornar um erro ao tentar criar um personagem já existente', async () => {
    const warriorProps: CharacterDTO = {
      name: 'Gusnmg Hujn',
      profession: 'warrior',
    };

    await expect(() => sut.execute(warriorProps)).rejects.toThrow();
    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
