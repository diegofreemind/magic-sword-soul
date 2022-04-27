import CreateCharacterController from '../../src/useCases/CreateCharacterController';
import CreateCharacterUseCase from '../../src/useCases/CreateCharacterUseCase';

const createCharacterUseCase = new CreateCharacterUseCase();
const sut = new CreateCharacterController(createCharacterUseCase);

test('Add unit tests for controller', () => {});
// const spy = jest.spyOn(sut, 'handle');

// afterEach(() => {
//   jest.resetAllMocks();
// });

// test('', async () => {
//   const payload = {
//     name: 'Judwl Hujn',
//     profession: 'warrior',
//   };

//   // jest.spyOn(createCharacterUseCase, 'execute').mockResolvedValue({});

//   const response = await sut.handle(payload);
//   expect(spy).toHaveBeenCalledTimes(1);
//   expect(response).toBeDefined();
//   expect.assertions(2);
// });

// test('', async () => {
//   const payload = {
//     name: 'Gusnmg Hujn',
//     profession: 'witcher',
//   };

//   try {
//     await expect(sut.handle(payload)).rejects.toThrow();
//   } catch (error) {
//     expect(error).toBeInstanceOf(TypeError);
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect.assertions(3);
//   }
// });
