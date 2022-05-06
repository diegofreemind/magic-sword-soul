import { UnprocessableException } from '../../src/shared/exceptions/UnprocessableException';
import { BadRequestException } from '../../src/shared/exceptions/BadRequestException';
import { NotFoundException } from '../../src/shared/exceptions/NotFoundException';

import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';
import { PerformRoundDTO } from '../../src/useCases/PerformBattle/PerformRoundDTO';

import { CharacterUseCaseFake } from '../__mocks__/CharacterUseCaseFake';
import { BattleRepositoryFake } from '../__mocks__/BattleRepositoryFake';
import { RoundRepositoryFake } from '../__mocks__/RoundRepositoryFake';

import { CharacterStatus } from '../../src/shared/enums/Character';
import { BattleStatus } from '../../src/shared/enums/Battle';
import { Character } from '../../src/entities/Character';
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

let battle: Battle;
let round: Round;

const aliveCharacters: Character[] =
  characterUseCaseFake.InMemoryCharacters.filter(
    (character) => character.getStatus === CharacterStatus.Alive
  );

// TODO: review side effects ( global)
beforeEach(async () => {
  jest.clearAllMocks();

  const [playerOne, playerTwo] = aliveCharacters;

  jest
    .spyOn(battleRepositoryFake, 'save')
    .mockResolvedValueOnce(Promise.resolve());

  battle = await sut.createBattle({
    players: [playerOne.getId, playerTwo.getId],
  });

  battle.setStatus = BattleStatus.Active;

  round = new Round(
    battle.getId,
    new Date().toISOString(),
    playerOne.getId,
    playerTwo.getId
  );

  jest
    .spyOn(battleRepositoryFake, 'findById')
    .mockResolvedValueOnce(Promise.resolve(battle));

  jest
    .spyOn(roundRepositoryFake, 'save')
    .mockResolvedValueOnce(Promise.resolve());

  jest
    .spyOn(battleRepositoryFake, 'update')
    .mockResolvedValueOnce(Promise.resolve());
});

describe('F4 - Realizar o combate entre dois personagens', () => {
  describe('Deve inicializar uma batalha', () => {
    test('Deve criar uma nova batalha', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      jest
        .spyOn(battleRepositoryFake, 'save')
        .mockResolvedValueOnce(Promise.resolve());

      const currentBattle = await sut.createBattle({
        players: [playerOne!.getId, playerTwo!.getId],
      });

      expect(currentBattle).toBeDefined();
      expect(currentBattle?.getId).toBeDefined();
      expect(currentBattle?.getStatus).toBe(BattleStatus.Closed);

      expect(currentBattle?.getPlayers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: playerOne.getName,
            profession: playerOne.getProfession,
          }),
          expect.objectContaining({
            name: playerTwo.getName,
            profession: playerTwo.getProfession,
          }),
        ])
      );
    });

    test('Deve retornar um erro ao criar uma batalha com personagens inexistentes', async () => {
      // const battleRepoSpy = jest.spyOn(battleRepositoryFake, 'save');

      try {
        await sut.createBattle({
          players: [
            'fe21a511-955f-447b-8f80-d06196061284',
            '2c9160da-0fb9-4d2f-aec6-c0a6de41ae7f',
          ],
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        // expect(battleRepoSpy).toHaveBeenCalledTimes(0);
      }
    });

    test('Deve abrir uma batalha existente', async () => {
      // TODO: review players usage ( explicit instances herein )
      jest.spyOn(battle, 'calculateSpeed').mockReturnValueOnce(100);

      const starterPlayer = await sut.executeBattle(battle.getId!);

      console.log(starterPlayer);
      expect(starterPlayer).toBeDefined();
      expect(starterPlayer).toHaveProperty('id');
      expect(starterPlayer).toHaveProperty('calculated');
    });

    test('Deve retornar um erro ao abrir uma batalha inexistente', async () => {
      try {
        await sut.executeBattle('2c9160da-0fb9-4d2f-aec6-c0a6de41ae7f');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    test('Deve definir qual personagem inicializará a batalha', async () => {
      // TODO: review players usage ( explicit instances herein )
      jest.spyOn(battle, 'calculateSpeed').mockReturnValueOnce(100);

      const fastestPlayer = sut.sortFasterPlayer(battle);

      expect(fastestPlayer).toBeDefined();
      expect(fastestPlayer.id).toBe(battle.getPlayers[0].getId);
      expect(fastestPlayer.id).not.toBe(battle.getPlayers[1].getId);

      expect(fastestPlayer).toHaveProperty('id');
      expect(fastestPlayer).toHaveProperty('calculated');
    });

    test('Deve recalcular as velocidades de personagens no caso de empate', async () => {
      jest.spyOn(battle, 'calculateSpeed').mockReturnValueOnce(2);
      const sutSpy = jest.spyOn(sut, 'executeBattle');

      // TODO: validate recursive strategy
      const calculatedRound = await sut.executeBattle(battle.getId!);

      expect(sutSpy).toBeCalled();
      expect(calculatedRound).toHaveProperty('id');
      expect(calculatedRound).toHaveProperty('calculated');
    });
  });

  describe.only('Deve conduzir uma batalha', () => {
    test('Deve executar um turno batalha', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      const props: PerformRoundDTO = {
        offensive: playerTwo.getId,
        defensive: playerOne.getId,
        battleId: battle!.getId,
      };

      expect(battle.getRounds).toHaveLength(0);

      const lastRound = new Round(
        battle.getId,
        new Date().toISOString(),
        playerOne.getId,
        playerTwo.getId
      );

      battle.setRounds = lastRound.getId;
      battle.setStarterPlayer = playerOne.getId;

      jest
        .spyOn(sut, 'getLastMove')
        .mockReturnValueOnce(Promise.resolve(lastRound));

      const round = await sut.executeRound(props);

      expect(round).toBeDefined();
      expect(round.getCalculatedAttack).toBeDefined();
      expect(round.getCalculatedDamage).toBeDefined();
      expect(round.getCalculatedSpeed).not.toBeDefined();
    });

    describe('Deve garantir a ordem das jogadas com base na velocidade_calculada inicial', () => {
      test('Deve retornar o turno de batalha mais recente', async () => {
        const [playerOne, playerTwo] = aliveCharacters;

        jest
          .spyOn(battleRepositoryFake, 'save')
          .mockResolvedValueOnce(Promise.resolve());

        const currentBattle = await sut.createBattle({
          players: [playerOne.getId, playerTwo.getId],
        });

        const firstRound = new Round(
          currentBattle.getId,
          new Date().toISOString(),
          playerOne.getId,
          playerTwo.getId
        );

        const secondRound = new Round(
          currentBattle.getId,
          new Date().toISOString(),
          playerTwo.getId,
          playerOne.getId
        );

        jest
          .spyOn(roundRepositoryFake, 'findById')
          .mockResolvedValueOnce(Promise.resolve(secondRound));

        currentBattle.setRounds = firstRound.getId;
        currentBattle.setRounds = secondRound.getId;

        expect(currentBattle.getRounds).toHaveLength(2);

        const sutSpy = jest.spyOn(sut, 'getLastMove');
        const lastMove = await sut.getLastMove(currentBattle);

        expect(lastMove).toBe(secondRound);
        expect(sutSpy).toBeCalledTimes(1);
      });

      test('Deve retornar um erro ao executar um turno fora da ordem esperada', async () => {
        jest
          .spyOn(roundRepositoryFake, 'findById')
          .mockResolvedValueOnce(Promise.resolve(round));

        const [playerOne, playerTwo] = aliveCharacters;

        const props: PerformRoundDTO = {
          offensive: playerOne.getId,
          defensive: playerTwo.getId,
          battleId: battle!.getId,
        };

        const currentRound = new Round(
          battle.getId,
          new Date().toISOString(),
          playerOne.getId,
          playerTwo.getId
        );

        battle.setRounds = currentRound.getId;
        battle.setStarterPlayer = playerOne.getId;

        try {
          await sut.executeRound(props);
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableException);
          expect(error).toHaveProperty('message');
          // expect(error).toMatchObject(
          //   expect.objectContaining({
          //     status: 400,
          //     message: `This turn is defensive for ${playerOne.getId} player`,
          //   })
          // );
        }
      });

      test('Deve retornar um erro ao executar um turno em uma batalha não inicializada', async () => {
        const [playerOne, playerTwo] = aliveCharacters;

        jest
          .spyOn(battleRepositoryFake, 'save')
          .mockResolvedValueOnce(Promise.resolve());

        const currentBattle = await sut.createBattle({
          players: [playerOne.getId, playerTwo.getId],
        });

        currentBattle.setStatus = BattleStatus.Closed;
        expect(currentBattle.getStatus).toBe(BattleStatus.Closed);

        jest
          .spyOn(battleRepositoryFake, 'findById')
          .mockResolvedValueOnce(Promise.resolve(currentBattle));

        const props: PerformRoundDTO = {
          offensive: playerOne.getId,
          defensive: playerTwo.getId,
          battleId: currentBattle!.getId,
        };

        try {
          await sut.executeRound(props);
        } catch (error) {
          expect(error).toBeDefined();
          expect(error).toBeInstanceOf(UnprocessableException);
        }
      });
    });

    test('Deve subtrair os pontos de vida de um personagem após o dano ser realizado', () => {});
  });

  describe('Deve finalizar uma batalha', () => {
    test('Deve apresentar o conjunto de turnos da batalha', () => {});
    test('Não devem ser persistidos os eventos de empate de velocidade', () => {});
    test('Deve informar qual personagem venceu e qual personagem morreu', () => {});
    test('Deve atualizar os pontos de vida de um personagem ao concluir', () => {});
  });
});
