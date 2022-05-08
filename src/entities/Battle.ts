import { v4 } from 'uuid';
import { Character } from './Character';
import { CharacterStatus } from '../shared/enums/Character';
import { ActionType, BattleStatus } from '../shared/enums/Battle';
import { BaseEntity } from './BaseEntity';

export default class Battle extends BaseEntity {
  constructor(
    private players: Character[],
    private playersQuantity: number,
    id?: string,
    private rounds: string[] = [],
    private starterPlayer?: string,
    private status?: BattleStatus
  ) {
    super(id);
    this.validateBattleConstraints();

    if (!status) {
      this.status = BattleStatus.Closed;
    }
  }

  get getPlayers() {
    return this.players;
  }

  get getStatus() {
    return this.status;
  }

  set setStatus(status: BattleStatus) {
    this.status = status;
  }

  get getRounds() {
    return this.rounds;
  }

  set setRounds(round: string) {
    this.rounds!.push(round);
  }

  get getStarterPlayer() {
    return this.starterPlayer;
  }

  set setStarterPlayer(id: string) {
    this.starterPlayer = id;
  }

  executeDamage(calculatedAttack: number, defensive: string): number {
    const targetPlayer = this.players.find(
      (player) => player.getId === defensive
    );

    if (targetPlayer) {
      targetPlayer.setLife = targetPlayer.getLife - calculatedAttack;
      return targetPlayer.getLife;
    }

    throw new Error(`The player ${defensive} was not found on this battle`);
  }

  calculateAttack(id: string, lucky?: number): number {
    return this.calculateAttribute(ActionType.Attack, id);
  }

  calculateSpeed(id: string, lucky?: number): number {
    return this.calculateAttribute(ActionType.Speed, id);
  }

  calculateDamage(calculatedAttack: number, defensive: string): number {
    const targetPlayer = this.players.find(
      (player) => player.getId === defensive
    );

    return targetPlayer!.getLife - calculatedAttack;
  }

  calculateAttribute(method: ActionType, id: string): number {
    const player = this.players.find((player) => player.getId === id);
    if (player) {
      const calculated = Math.floor(Math.random() * player[method]());
      return calculated;
    }

    throw new Error(`The player ${id} was not found on this battle`);
  }

  validateBattleConstraints() {
    if (this.players.length < this.playersQuantity) {
      throw new Error(
        `This battle requires at least ${this.playersQuantity} characters`
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
