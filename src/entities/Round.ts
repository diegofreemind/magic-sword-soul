import { v4 } from 'uuid';

// TODO: handle as Event ( Aggregation )
export default class Round {
  constructor(
    private battleId: string,
    private timestamp: string,
    private offensive: string,
    private defensive: string,
    private id?: string,
    private calculatedSpeed?: number,
    private calculatedAttack?: number,
    private calculatedDamage?: number
  ) {
    timestamp = new Date().toISOString();
    id = v4();
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
