import Mage from '../../src/entities/Mage';
import Thief from '../../src/entities/Thief';
import Warrior from '../../src/entities/Warrior';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepositoryFake';
import CharacterFactory from '../../src/useCases/CreateCharacter/CharacterFactory';
import { CreateCharacterDTO } from '../../src/useCases/CreateCharacter/CreateCharacterDTO';
import CreateCharacterUseCase from '../../src/useCases/CreateCharacter/CreateCharacterUseCase';
import { BadRequestException } from '../../src/shared/exceptions/BadRequestException';
import { ConflictException } from '../../src/shared/exceptions/ConflictException';

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new CreateCharacterUseCase(characterRepositoryFake);

const repositorySpy = jest.spyOn(characterRepositoryFake, 'find');
const factorySpy = jest.spyOn(CharacterFactory, 'create');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('F1 - Criação de um novo personagem', () => {
  test('Cria um novo personagem Warrior ao receber os parâmetros esperados', async () => {
    const warriorProps: CreateCharacterDTO = {
      name: 'Gusnmg_Hujn',
      profession: 'warrior',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const warrior = await sut.execute(warriorProps);
    expect(warrior).toBeInstanceOf(Warrior);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Cria um novo personagem Thief ao receber os parâmetros esperados', async () => {
    const thiefProps: CreateCharacterDTO = {
      name: 'Fytr_Hujn',
      profession: 'thief',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const thief = await sut.execute(thiefProps);
    expect(thief).toBeInstanceOf(Thief);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Cria um novo personagem Mage ao receber os parâmetros esperados', async () => {
    const mageProps: CreateCharacterDTO = {
      name: 'Dangalf_Hujn',
      profession: 'mage',
    };

    expect(sut).toBeDefined();

    jest.spyOn(characterRepositoryFake, 'find').mockResolvedValueOnce([]);

    const mage = await sut.execute(mageProps);
    expect(mage).toBeInstanceOf(Mage);

    expect(factorySpy).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um erro ao receber os parâmetros incorretos', async () => {
    try {
      await sut.execute({} as CreateCharacterDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(repositorySpy).toHaveBeenCalledTimes(0);
    }
  });

  test('Deve retornar um erro ao receber uma profissão desconhecida', async () => {
    try {
      await sut.execute({ name: 'Gerald', profession: 'witcher' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(repositorySpy).toHaveBeenCalledTimes(0);
    }
  });

  test('Deve retornar um erro ao tentar criar um personagem já existente', async () => {
    const warriorProps: CreateCharacterDTO = {
      name: 'Gusnmg_Hujn',
      profession: 'warrior',
    };

    jest
      .spyOn(characterRepositoryFake, 'find')
      .mockResolvedValueOnce([
        new Warrior(warriorProps.name, warriorProps.profession),
      ]);

    try {
      await sut.execute(warriorProps);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(repositorySpy).toHaveBeenCalledTimes(1);
    }
  });
});
