import { validatorDto } from '../../src/shared/validators/validatorDTO';
import { CharacterDTO } from '../../src/useCases/CharacterDTO';

test('Deve validar o payload sobre propriedades mapeadas na classe CharacterDTO', async () => {
  const props = {
    name: 'Dangalf Mugh',
    profession: 'mage',
  };

  expect(() => validatorDto(CharacterDTO, props)).not.toThrow();
  expect.assertions(1);
});

test('Deve retornar um erro sobre propriedades mapeadas na classe CharacterDTO', async () => {
  const props = {
    name: 'Dangalf Mugh',
    profession: 'witcher',
  };

  await expect(validatorDto(CharacterDTO, props)).rejects.toThrow();
});
