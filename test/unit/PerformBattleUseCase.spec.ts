import PerformBattleUseCase from '../../src/useCases/PerformBattle/PerformBattleUseCase';
import { CharacterRepositoryFake } from '../__mocks__/CharacterRepository';
import { CharacterStatus } from '../../src/shared/enums/Character';
import { Character } from '../../src/entities/Character';
import { BattleStatus } from '../../src/shared/enums/Battle';

const characterRepositoryFake = new CharacterRepositoryFake();
const sut = new PerformBattleUseCase(characterRepositoryFake);

const { collection } = characterRepositoryFake.InMemoryCharacters;

const aliveCharacters: Character[] = collection.filter(
  (character) => character.getStatus === CharacterStatus.Alive
);

describe('F4 - Realizar o combate entre dois personagens', () => {
  test.only('Deve criar uma nova batalha', async () => {
    const [playerOne, playerTwo] = aliveCharacters;

    console.log({ playerOne, playerTwo });

    if (playerOne.getId && playerTwo.getId) {
      const battle = await sut.createBattle({
        players: [playerOne.getId, playerTwo.getId],
      });

      console.log({ battle });

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
    }
  });

  test('Deve recalcular a velocidade no caso de empate', async () => {});
  test('Deve garantir a ordem das jogadas com base na velocidade', () => {});
  test('Não devem ser persistidos os eventos de empate de velocidade', () => {});
  test('Não devem ser persistidos os pontos de vida menores do que 0', () => {});
  test('Deve atualizar os pontos de vida de um personagem ao concluir', () => {}); // TODO: interaction with inMemoryCharacter[]
});
