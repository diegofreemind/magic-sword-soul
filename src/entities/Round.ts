import { IMethodCalculate } from '../shared/interfaces/IPerformBattle';
import { RoundType } from '../shared/enums/Battle';
import { BaseEntity } from './BaseEntity';

export default class Round extends BaseEntity {
  constructor(
    private battleId: string,
    private offensive: string,
    private defensive: string,
    private type?: RoundType,
    private timestamp?: string,
    id?: string,
    private calculatedSpeed?: IMethodCalculate[],
    private calculatedAttack?: number,
    private calculatedDamage?: number
  ) {
    super(id);

    if (!type) {
      this.type = RoundType.OnGoing;
    }

    if (!timestamp) {
      this.timestamp = new Date().toISOString();
    }

    if (!calculatedSpeed) {
      this.calculatedSpeed = [];
    }
  }

  get getBattleId() {
    return this.battleId;
  }

  get getOffensive() {
    return this.offensive;
  }

  get getTimestamp() {
    return this.timestamp;
  }

  get getType() {
    return this.type;
  }

  set setType(type: RoundType) {
    this.type = type;
  }

  get getDefensive() {
    return this.defensive;
  }

  get getCalculatedSpeed() {
    return {
      offensive: this.calculatedSpeed?.find((i) => i.id === this.getOffensive),
      defensive: this.calculatedSpeed?.find((i) => i.id === this.getDefensive),
    };
  }

  set setCalculatedSpeed(calculatedSpeed: IMethodCalculate) {
    this.calculatedSpeed?.push(calculatedSpeed);
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
