import { Character } from '../../src/entities/Character';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactory';
import CharacterRepository from '../../src/repositories/implementations/CharacterRepository';

let repository: CharacterRepository;
const characterFactoryStub = new CharacterFactoryStub(5000);

beforeEach(() => {
  repository = new CharacterRepository();
});

describe('CharacterRepository:', () => {
  test('save', async () => {
    const [character] = characterFactoryStub.collection;
    const repoSaveSpy = jest.spyOn(repository, 'save');

    await repository.save(character);

    expect(repoSaveSpy).toHaveReturnedTimes(1);
  });

  test('find', async () => {
    const [characterOne, characterTwo, characterThree] =
      characterFactoryStub.collection;
    const repoFindSpy = jest.spyOn(repository, 'find');

    await repository.save(characterOne);
    await repository.save(characterTwo);
    await repository.save(characterThree);

    const foundAllPages = await repository.find({});

    const foundPageOne = await repository.find(
      {},
      { pageNumber: 0, pageSize: 1 }
    );

    const foundPageTwo = await repository.find(
      {},
      { pageNumber: 1, pageSize: 1 }
    );

    const foundPageThree = await repository.find(
      {},
      { pageNumber: 2, pageSize: 1 }
    );

    expect(foundPageOne).toBeDefined();
    expect(foundPageTwo).toBeDefined();
    expect(foundPageThree).toBeDefined();

    expect(foundPageOne).toHaveLength(1);
    expect(foundPageTwo).toHaveLength(1);
    expect(foundPageThree).toHaveLength(1);

    expect(foundAllPages).toHaveLength(3);

    expect(repoFindSpy).toHaveReturnedTimes(4);
    expect(foundAllPages[0]).toBeInstanceOf(Character);
  });

  test('update', async () => {
    const [character] = characterFactoryStub.collection;
    const repoSaveSpy = jest.spyOn(repository, 'save');
    const repoUpdateSpy = jest.spyOn(repository, 'update');

    expect(character.getLife).not.toBe(100);

    await repository.save(character);
    await repository.update(character.getId, { life: 100 });

    const characterFromRepo = await repository.findById(character.getId);

    expect(character.getLife).toBe(100);
    expect(characterFromRepo!.getLife).toBe(100);

    expect(repoSaveSpy).toHaveReturnedTimes(1);
    expect(repoUpdateSpy).toHaveReturnedTimes(1);
  });

  test('findById', async () => {
    const [character] = characterFactoryStub.collection;
    await repository.save(character);

    const characterFromRepo = await repository.findById(character.getId);
    expect(characterFromRepo).toBeDefined();
  });
});
