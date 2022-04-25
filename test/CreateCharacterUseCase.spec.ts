import CreateCharacterUseCase from '../src/useCases/CreateCharacterUseCase';
import { CharacterProps } from '../src/useCases/CreateCharacterUseCase';
import Warrior from '../src/entities/Warrior';
import Thief from '../src/entities/Thief';
import Mage from '../src/entities/Mage';

describe('F1 - Deve criar um novo personagem', () => {
  test('Cria um novo personagem ao receber os parâmetros esperados', () => {
    const warriorProps: CharacterProps = {
      name: 'Gusnmg Hujn',
      profession: 'warrior',
    };

    const thiefProps: CharacterProps = {
      name: 'Fytr Hujn',
      profession: 'thief',
    };

    const mageProps: CharacterProps = {
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
    expect(() => sut.execute({} as CharacterProps)).toThrow();
  });
});
