import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';

import { roundsStub } from '../__stubs__/PerformRound';
import { RoundType } from '../../src/shared/enums/Battle';
import { BattleRepositoryFake } from '../__mocks__/BattleRepositoryFake';
import { CharacterUseCaseFake } from '../__mocks__/CharacterUseCaseFake';
import { RoundRepositoryFake } from '../__mocks__/RoundRepositoryFake';
import { battleStub, getAliveCharacters } from '../__stubs__/PerformBattle';
import { CharacterStatus } from '../../src/shared/enums/Character';

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

    const currentBattle = await battleStub(sut, battleRepositoryFake, [
      playerOne,
      playerTwo,
    ]);

    const quantityRounds = 10;

    const { roundCollection } = await roundsStub(quantityRounds, currentBattle);

    jest
      .spyOn(roundRepositoryFake, 'find')
      .mockResolvedValue(Promise.resolve(roundCollection));

    jest
      .spyOn(battleRepositoryFake, 'findById')
      .mockResolvedValue(Promise.resolve(currentBattle));

    const { rounds } = await sut.getBattleLog(currentBattle.getId);
    const initialRound = rounds.filter((r) => r.getType === RoundType.Initial);

    expect(rounds).toBeDefined();
    expect(initialRound).toHaveLength(1);
  });

  test('Deve informar qual personagem venceu e qual personagem morreu', async () => {
    const [playerOne, playerTwo] = getAliveCharacters();

    const currentBattle = await battleStub(sut, battleRepositoryFake, [
      playerOne,
      playerTwo,
    ]);

    const quantityRounds = 10;

    const { roundCollection, stubBattle } = await roundsStub(
      quantityRounds,
      currentBattle
    );

    jest
      .spyOn(roundRepositoryFake, 'find')
      .mockResolvedValue(Promise.resolve(roundCollection));

    jest
      .spyOn(battleRepositoryFake, 'findById')
      .mockResolvedValue(Promise.resolve(stubBattle));

    const { rounds, battle } = await sut.getBattleLog(currentBattle.getId);

    const winner = battle?.getWinnerPlayer;
    const looser = battle?.getPlayers.find(
      (p) => p.getStatus === CharacterStatus.Dead
    );

    expect(winner).toBeDefined();
    expect(looser).toBeDefined();
    expect(rounds.length).toBeLessThanOrEqual(quantityRounds);
  });

  test('Deve apresentar o conjunto de turnos da batalha', () => {});
});
