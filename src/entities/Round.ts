import { v4 } from 'uuid';

// TODO: handle as Event ( Aggregation )
export default class Round {
  constructor(
    private battleId: string,
    private timestamp: string,
    private offensive: string,
    private defensive: string,
    private id: string = v4(),
    private calculatedSpeed?: number,
    private calculatedAttack?: number,
    private calculatedDamage?: number
  ) {
    timestamp = new Date().toISOString();
  }

  get getId() {
    return this.id;
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
