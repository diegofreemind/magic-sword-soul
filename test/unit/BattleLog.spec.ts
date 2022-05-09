import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';
import { MIN_BATTLE_CHARACTERS } from '../../src/shared/constants/battlefield';

import { BattleRepositoryFake } from '../__mocks__/BattleRepositoryFake';
import { CharacterUseCaseFake } from '../__mocks__/CharacterUseCaseFake';
import { RoundRepositoryFake } from '../__mocks__/RoundRepositoryFake';
import { getAliveCharacters } from '../__stubs__/PerformBattle';
import Battle from '../../src/entities/Battle';
import Round from '../../src/entities/Round';

const characterUseCaseFake = new CharacterUseCaseFake();
const battleRepositoryFake = new BattleRepositoryFake();
const roundRepositoryFake = new RoundRepositoryFake();

const sut = new PerformBattleUseCase(
  battleRepositoryFake,
  characterUseCaseFake,
  roundRepositoryFake
);

beforeEach(async () => {
  jest.clearAllMocks();
});

describe('F4 - Log de Batalha', () => {
  test('Não devem ser persistidos os eventos de empate de velocidade', async () => {
    const [playerOne, playerTwo] = getAliveCharacters();

    const battleOne = new Battle([playerOne, playerTwo], MIN_BATTLE_CHARACTERS);
    const battleTwo = new Battle([playerOne, playerTwo], MIN_BATTLE_CHARACTERS);

    const anotherRound = new Round(
      battleTwo.getId,
      new Date().toISOString(),
      playerOne.getId,
      playerTwo.getId
    );

    const roundOne = new Round(
      battleOne.getId,
      new Date().toISOString(),
      playerOne.getId,
      playerTwo.getId
    );

    const roundTwo = new Round(
      battleOne.getId,
      new Date().toISOString(),
      playerTwo.getId,
      playerOne.getId
    );

    jest
      .spyOn(roundRepositoryFake, 'save')
      .mockResolvedValue(Promise.resolve());

    jest
      .spyOn(roundRepositoryFake, 'find')
      .mockResolvedValue(Promise.resolve([roundOne, roundTwo]));

    await roundRepositoryFake.save(roundOne);
    await roundRepositoryFake.save(roundTwo);
    await roundRepositoryFake.save(anotherRound);

    const battleLogs = await sut.getBattleLog(battleOne.getId);

    console.log({ battleLogs });
    expect(battleLogs).toBeDefined();
  });
  test('Deve informar qual personagem venceu e qual personagem morreu', () => {});
  test('Deve apresentar o conjunto de turnos da batalha', () => {});
});
