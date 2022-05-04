import { validatorDto } from '../../src/shared/validators/validatorDTO';
import { ListCharacterDTO } from '../../src/useCases/ListCharacter/ListCharacterDTO';
import { BadRequestException } from '../../src/shared/exceptions/BadRequestException';
import { CreateCharacterDTO } from '../../src/useCases/CreateCharacter/CreateCharacterDTO';
import { CharacterStatus } from '../../src/shared/enums/Character';

describe('Character: Um nome só pode ter letras ou o carácter de "_" (underscore/sublinhado)', () => {
  test('Deve validar nome com o formato esperado', async () => {
    const props = {
      name: 'Dangalf_Mugh',
      profession: 'mage',
    };

    // TODO: set custom error ( spaces | underscore )
    await expect(
      validatorDto(CreateCharacterDTO, props)
    ).resolves.not.toThrow();
  });

  test('Deve retornar um erro ao receber um número junto ao nome', async () => {
    const props = {
      name: 'Dangalf8Mugh',
      profession: 'mage',
    };

    try {
      await validatorDto(CreateCharacterDTO, props);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message');
      expect(error).toMatchObject(
        expect.objectContaining({
          status: 400,
          message: 'name must match /^[a-zA-Z_]+$/ regular expression',
        })
      );
      expect.assertions(3);
    }
  });

  test('Deve retornar um erro ao receber uma profissão desconhecida', async () => {
    const props = {
      name: 'DangalfMugh',
      profession: 'witcher',
    };

    try {
      await validatorDto(CreateCharacterDTO, props);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message');
      expect(error).toMatchObject(
        expect.objectContaining({
          status: 400,
          message:
            'profession must be one of the following values: warrior, thief, mage',
        })
      );
      expect.assertions(3);
    }
  });
});

describe('Character: Nenhum nome de personagem pode ter mais que 15 caracteres no total', () => {
  test('Deve retornar um erro ao receber um nome com mais de 15 caracteres', async () => {
    const props = {
      name: 'DangalfKhjytFdrtew',
      profession: 'mage',
    };

    try {
      await validatorDto(CreateCharacterDTO, props);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message');
      expect(error).toMatchObject(
        expect.objectContaining({
          status: 400,
          message: 'name must be shorter than or equal to 15 characters',
        })
      );
      expect.assertions(3);
    }
  });

  test('Deve retornar um erro ao receber um nome com espaços em branco', async () => {
    const props = {
      name: 'Dang hjytF',
      profession: 'mage',
    };

    try {
      await validatorDto(CreateCharacterDTO, props);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message');

      // TODO: set custom error ( spaces | underscore )
      expect(error).toMatchObject(
        expect.objectContaining({
          status: 400,
          message: 'name must match /^[a-zA-Z_]+$/ regular expression',
        })
      );
      expect.assertions(3);
    }
  });
});

describe('Character: Objetos de transferência de dados devem atender os casos de uso', () => {
  test('CreateCharacterDTO: Deve retornar um erro ao receber um objeto vazio', async () => {
    const props = {};
    await expect(validatorDto(CreateCharacterDTO, props)).rejects.toThrow();
  });

  test('CreateCharacterDTO: Deve retornar um erro ao receber valores indefinidos', async () => {
    const props = { name: undefined, profession: undefined };
    await expect(validatorDto(CreateCharacterDTO, props)).rejects.toThrow();
  });

  test('ListCharacterDTO: Deve retornar um erro ao receber um objeto vazio', async () => {
    const props = {};
    await expect(validatorDto(ListCharacterDTO, props)).rejects.toThrow();
  });

  test('ListCharacterDTO: Deve aceitar atributos parciais informados', async () => {
    const props = { status: CharacterStatus.Dead };
    await expect(validatorDto(ListCharacterDTO, props)).resolves.toBe(
      undefined
    );
  });
});
