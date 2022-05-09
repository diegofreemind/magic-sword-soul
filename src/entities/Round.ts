import { BaseEntity } from './BaseEntity';

export default class Round extends BaseEntity {
  constructor(
    private battleId: string,
    private offensive: string,
    private defensive: string,
    private timestamp?: string,
    id?: string,
    private calculatedSpeed?: number,
    private calculatedAttack?: number,
    private calculatedDamage?: number
  ) {
    super(id);

    if (!timestamp) {
      this.timestamp = new Date().toISOString();
    }
  }

  get getBattleId() {
    return this.battleId;
  }

  get getOffensive() {
    return this.offensive;
  }

  get getDefensive() {
    return this.defensive;
  }

  get getCalculatedSpeed() {
    return this.calculatedSpeed;
  }

  set setCalculatedSpeed(speed: number) {
    this.calculatedSpeed = speed;
  }

  get getCalculatedAttack() {
    return this.calculatedAttack;
  }

  set setCalculatedAttack(attack: number) {
    this.calculatedAttack = attack;
  }

  get getCalculatedDamage() {
    return this.calculatedDamage;
  }

  set setCalculatedDamage(damage: number) {
    this.calculatedDamage = damage;
  }
}
