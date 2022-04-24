export abstract class Character {
  constructor(
    protected life: Number,
    protected skill: Number,
    protected strength: Number,
    protected intelligence: Number
  ) {}

  get getLife() {
    return this.life;
  }

  get getSkill() {
    return this.skill;
  }

  get getStrength() {
    return this.strength;
  }

  get getIntelligence() {
    return this.intelligence;
  }
}
