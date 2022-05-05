import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';

import { CharacterUseCaseFake } from '../__mocks__/CharacterUseCaseFake';
import { BattleRepositoryFake } from '../__mocks__/BattleRepositoryFake';

import { CharacterStatus } from '../../src/shared/enums/Character';
import { BattleStatus } from '../../src/shared/enums/Battle';
import { Character } from '../../src/entities/Character';
import { PerformRoundDTO } from '../../src/useCases/PerformBattle/PerformRoundDTO';

const characterUseCaseFake = new CharacterUseCaseFake();
const battleRepositoryFake = new BattleRepositoryFake();

const sut = new PerformBattleUseCase(
  battleRepositoryFake,
  characterUseCaseFake
);

const aliveCharacters: Character[] =
  characterUseCaseFake.InMemoryCharacters.filter(
    (character) => character.getStatus === CharacterStatus.Alive
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('F4 - Realizar o combate entre dois personagens', () => {
  describe('Deve inicializar uma batalha', () => {
    test('Deve criar uma nova batalha', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      jest
        .spyOn(battleRepositoryFake, 'save')
        .mockResolvedValueOnce(Promise.resolve());

      const battle = await sut.createBattle({
        players: [playerOne!.getId, playerTwo!.getId],
      });

      expect(battle).toBeDefined();
      expect(battle?.getId).toBeDefined();
      expect(battle?.getStatus).toBe(BattleStatus.Closed);

      expect(battle?.getPlayers).toEqual(
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

    test('Deve definir qual personagem inicializará a batalha', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      jest
        .spyOn(battleRepositoryFake, 'save')
        .mockResolvedValueOnce(Promise.resolve());

      const battle = await sut.createBattle({
        players: [playerOne.getId, playerTwo.getId],
      });

      jest
        .spyOn(battleRepositoryFake, 'findById')
        .mockResolvedValueOnce(Promise.resolve(battle));

      jest
        .spyOn(battleRepositoryFake, 'update')
        .mockResolvedValueOnce(Promise.resolve());

      jest.spyOn(battle, 'calculateSpeed').mockReturnValueOnce(100);

      const whoWillStart = await sut.executeBattle(battle.getId!);

      console.log(whoWillStart);
      expect(whoWillStart).toBeDefined();
    });

    test('Deve recalcular as velocidades de personagens no caso de empate', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      jest
        .spyOn(battleRepositoryFake, 'save')
        .mockResolvedValueOnce(Promise.resolve());

      const battle = await sut.createBattle({
        players: [playerOne.getId, playerTwo.getId],
      });

      jest
        .spyOn(battleRepositoryFake, 'findById')
        .mockResolvedValueOnce(Promise.resolve(battle));

      jest
        .spyOn(battleRepositoryFake, 'update')
        .mockResolvedValueOnce(Promise.resolve());

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
    test('Deve criar um turno batalha', async () => {
      const [playerOne, playerTwo] = aliveCharacters;

      jest
        .spyOn(battleRepositoryFake, 'save')
        .mockResolvedValueOnce(Promise.resolve());

      const battle = await sut.createBattle({
        players: [playerOne.getId, playerTwo.getId],
      });

      jest
        .spyOn(battleRepositoryFake, 'findById')
        .mockResolvedValueOnce(Promise.resolve(battle));

      jest
        .spyOn(battleRepositoryFake, 'update')
        .mockResolvedValueOnce(Promise.resolve());

      if (battle!.getId) {
        const props: PerformRoundDTO = {
          offensive: playerOne.getId,
          defensive: playerTwo.getId,
          battleId: battle!.getId,
        };

        const round = await sut.executeRound(props);

        expect(round).toBeDefined();
        expect(round.getCalculatedAttack).toBeDefined();
        expect(round.getCalculatedDamage).toBeDefined();
        expect(round.getCalculatedSpeed).not.toBeDefined();
      }
    });

    test('Deve garantir a ordem das jogadas com base na velocidade_calculada inicial', () => {});
    test('Deve subtrair os pontos de vida de um personagem após o dano ser realizado', () => {});
  });

  describe('Deve finalizar uma batalha', () => {
    test('Deve apresentar o conjunto de turnos da batalha', () => {});
    test('Não devem ser persistidos os eventos de empate de velocidade', () => {});
    test('Deve informar qual personagem venceu e qual personagem morreu', () => {});
    test('Deve atualizar os pontos de vida de um personagem ao concluir', () => {});
  });
});
