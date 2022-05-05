import { MIN_BATTLE_CHARACTERS } from '../../src/shared/constants/battlefield';
import { CharacterFactoryStub } from '../__stubs__/CharacterFactory';
import { CharacterStatus } from '../../src/shared/enums/Character';
import { Character } from '../../src/entities/Character';
import Battle from '../../src/entities/Battle';

const characterFactory = new CharacterFactoryStub(10);

const aliveCharacters: Character[] = characterFactory.collection.filter(
  (character) => character.getStatus === CharacterStatus.Alive
);

describe('Validações sobre a entidade de Batalha', () => {
  test('Deve instanciar uma batalha com 2 personagens', () => {
    expect(
      () =>
        new Battle(
          [aliveCharacters[0], aliveCharacters[1]],
          MIN_BATTLE_CHARACTERS
        )
    ).not.toThrow();
  });

  test('Não deve instanciar uma batalha com menos de 2 personagens', () => {
    const singleCharacter = aliveCharacters[0];
    expect(
      () => new Battle([singleCharacter], MIN_BATTLE_CHARACTERS)
    ).toThrowError(
      `This battle requires at least ${MIN_BATTLE_CHARACTERS} characters`
    );
  });

  test('Não deve permitir personagens com status `dead` na batalha', () => {
    expect(
      () => new Battle(characterFactory.collection, MIN_BATTLE_CHARACTERS)
    ).toThrowError('Only alive characters can join this battle');
  });

  test('Não deve permitir personagens duplicados na batalha', () => {
    const firstPlayer = aliveCharacters[0];
    const repeatedPlayer = aliveCharacters[0];
    expect(
      () => new Battle([firstPlayer, repeatedPlayer], MIN_BATTLE_CHARACTERS)
    ).toThrowError('Duplicated characters are not allowed on this battle');
  });

  test('Deve calcular o ataque de um determinado personagem', () => {
    const singleCharacter = aliveCharacters[0];

    const battle = new Battle(
      [aliveCharacters[0], aliveCharacters[1]],
      MIN_BATTLE_CHARACTERS
    );

    const calcultedAttack = battle.calculateAttack(singleCharacter!.getId);
    expect(calcultedAttack).toBeLessThanOrEqual(singleCharacter.attack());
    expect(calcultedAttack).toBeGreaterThanOrEqual(0);
  });

  test('Deve calcular a velocidade de um determinado personagem', () => {
    const singleCharacter = aliveCharacters[0];

    const battle = new Battle(
      [aliveCharacters[0], aliveCharacters[1]],
      MIN_BATTLE_CHARACTERS
    );

    const calcultedSpeed = battle.calculateSpeed(singleCharacter!.getId);
    expect(calcultedSpeed).toBeLessThanOrEqual(singleCharacter.speed());
    expect(calcultedSpeed).toBeGreaterThanOrEqual(0);
  });
});
