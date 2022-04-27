import CreateCharacterUseCase from '../../src/useCases/CreateCharacterUseCase';
import { CharacterDTO } from '../../src/useCases/CharacterDTO';
import Warrior from '../../src/entities/Warrior';
import Thief from '../../src/entities/Thief';
import Mage from '../../src/entities/Mage';

// TODO: inject fake repository

describe('Validações sobre o caso de uso CreateCharacter', () => {
  test('Cria um novo personagem ao receber os parâmetros esperados', () => {
    const warriorProps: CharacterDTO = {
      name: 'Gusnmg Hujn',
      profession: 'warrior',
    };

    const thiefProps: CharacterDTO = {
      name: 'Fytr Hujn',
      profession: 'thief',
    };

    const mageProps: CharacterDTO = {
      name: 'Dangalf Hujn',
      profession: 'mage',
    };

    const sut = new CreateCharacterUseCase();
    expect(sut).toBeDefined();

    const warrior = sut.execute(warriorProps);
    expect(warrior).toBeInstanceOf(Warrior);

    const thief = sut.execute(thiefProps);
    expect(thief).toBeInstanceOf(Thief);

    const mage = sut.execute(mageProps);
    expect(mage).toBeInstanceOf(Mage);
  });

  it('Deve retornar um erro ao receber os parâmetros incorretos', () => {
    const sut = new CreateCharacterUseCase();
    expect(() => sut.execute({} as CharacterDTO)).toThrow();
  });

  it('Deve retornar um erro ao receber uma profissão desconhecida', () => {
    const sut = new CreateCharacterUseCase();
    expect(() =>
      sut.execute({ name: 'Dangalf', profession: 'witcher' } as any)
    ).toThrow();
  });
});
