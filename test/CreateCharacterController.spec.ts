import CreateCharacterController from '../src/useCases/CreateCharacterController';
import CreateCharacterUseCase from '../src/useCases/CreateCharacterUseCase';

const createCharacterUseCase = new CreateCharacterUseCase();

test('Deve validar os atributos de criação do personagem', async () => {
  const payload = {
    name: 'Judwl Hujn',
    profession: 'warrior',
  };

  const sut = new CreateCharacterController(createCharacterUseCase);
  await expect(sut.handle(payload)).resolves.toBeDefined();
});

test('Deve lançar uma exceção ao lidar com uma profissão não disponível', async () => {
  const payload = {
    name: 'Gusnmg Hujn',
    profession: 'whitcher',
  };

  const sut = new CreateCharacterController(createCharacterUseCase);

  try {
    await expect(sut.handle(payload)).rejects.toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});
