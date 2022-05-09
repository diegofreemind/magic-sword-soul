import Battle from '../../src/entities/Battle';
import { Character } from '../../src/entities/Character';
import { BattleStatus } from '../../src/shared/enums/Battle';
import { CharacterStatus } from '../../src/shared/enums/Character';
import { CharacterUseCaseFake } from '../__mocks__/CharacterUseCaseFake';
import { BattleRepositoryFake } from '../__mocks__/BattleRepositoryFake';
import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';

const characterUseCaseFake = new CharacterUseCaseFake();

export const getAliveCharacters = (): Character[] => {
  return characterUseCaseFake.InMemoryCharacters.filter(
    (character) => character.getStatus === CharacterStatus.Alive
  );
};

export const battleStub = async (
  sut: PerformBattleUseCase,
  repository: BattleRepositoryFake,
  players: Character[],
  status?: BattleStatus
) => {
  const [playerOne, playerTwo] = players;

  jest.spyOn(repository, 'save').mockResolvedValueOnce(Promise.resolve());

  const battle: Battle = await sut.createBattle({
    players: [playerOne.getId, playerTwo.getId],
  });

  battle.setStatus = status ? status : BattleStatus.Closed;

  return battle;
};
