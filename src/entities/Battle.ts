import { v4 } from 'uuid';
import { Character } from './Character';
import { CharacterStatus, ActionTypes } from '../shared/enums/Character';

const MIN_LUCKY_POINTS = 0;
const MAX_LUCKY_POINTS = 100;

export default class Battle {
  constructor(
    private players: Character[],
    private quantity: number,
    protected id?: string
  ) {
    this.validateBattleConstraints();

    if (!id) {
      this.id = v4();
    }
  }

  calculateAttack(id: string, lucky?: number): number {
    return this.calculateAttribute(ActionTypes.Attack, id);
  }

  calculatedSpeed(id: string, lucky?: number) {
    return this.calculateAttribute(ActionTypes.Speed, id);
  }

  calculateAttribute(method: ActionTypes, id: string) {
    const player = this.players.find((player) => player.getId === id);
    if (player) {
      return Math.floor(Math.random() * player[method]());
    }

    throw new Error(`The player ${id} was not found on this battle`);
  }

  validateBattleConstraints() {
    if (this.players.length < this.quantity) {
      throw new Error(
        `This battle requires at least ${this.quantity} characters`
      );
    }

    const deadCharacter = this.players.find(
      (player) => player.getStatus === CharacterStatus.Dead
    );

    if (deadCharacter) {
      throw new Error(`Only alive characters can join this battle`);
    }

    const duplicatedPlayer = this.players.find(
      (value) => this.players.indexOf(value) !== this.players.lastIndexOf(value)
    );

    if (duplicatedPlayer) {
      throw new Error(`Duplicated characters are not allowed on this battle`);
    }
  }
}
