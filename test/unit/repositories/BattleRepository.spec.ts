import Battle from '../../../src/entities/Battle';
import { BattleStatus } from '../../../src/shared/enums/Battle';
import { getAliveCharacters } from '../../__stubs__/PerformBattle';
import { MIN_BATTLE_CHARACTERS } from '../../../src/shared/constants/battlefield';
import BattleRepository from '../../../src/repositories/implementations/BattleRepository';

let repository: BattleRepository;

beforeEach(() => {
  repository = new BattleRepository();
});

describe('BattleRepository:', () => {
  test('update', async () => {
    const [
      playerOne,
      playerTwo,
      playerThree,
      playerFour,
      playerFive,
      playerSix,
    ] = getAliveCharacters();

    const battleOne = new Battle([playerOne, playerTwo], MIN_BATTLE_CHARACTERS);

    const battleTwo = new Battle(
      [playerThree, playerFour],
      MIN_BATTLE_CHARACTERS
    );

    const battleThree = new Battle(
      [playerFive, playerSix],
      MIN_BATTLE_CHARACTERS
    );

    const repoSaveSpy = jest.spyOn(repository, 'save');
    const repoUpdateSpy = jest.spyOn(repository, 'update');

    await repository.save(battleOne);
    await repository.save(battleTwo);
    await repository.save(battleThree);

    expect(battleOne.getStarterPlayer).not.toBeDefined();

    battleOne.setStarterPlayer = playerOne.getId;

    await repository.update(battleOne.getId, {
      starterPlayer: battleOne.getStarterPlayer,
      status: BattleStatus.Active,
    });

    expect(battleOne.getStarterPlayer).toBeDefined();

    expect(repoSaveSpy).toHaveBeenCalledTimes(3);
    expect(repoUpdateSpy).toHaveBeenCalledTimes(1);
  });

  test('findById', async () => {
    const [playerOne, playerTwo] = getAliveCharacters();

    const battleOne = new Battle([playerOne, playerTwo], MIN_BATTLE_CHARACTERS);

    const repoSaveSpy = jest.spyOn(repository, 'save');
    const repoFindSpy = jest.spyOn(repository, 'findById');

    await repository.save(battleOne);
    const foundBattle = await repository.findById(battleOne.getId);

    expect(foundBattle).toBeDefined();
    expect(foundBattle!.getId).toBe(battleOne.getId);

    expect(repoSaveSpy).toBeCalledTimes(1);
    expect(repoFindSpy).toBeCalledTimes(1);
  });
});
