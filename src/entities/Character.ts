// TODO: add generic props Character<T>?
// TODO: generate uuid for Character
// TODO: handle Character props Omit<Character, 'id'>

import { Professions } from '../useCases/CharacterDTO';
import { v4 } from 'uuid';

export abstract class Character {
  constructor(
    protected name: string,
    protected profession: Professions,
    protected life: Number,
    protected skill: Number,
    protected strength: Number,
    protected intelligence: Number,
    protected id?: string
  ) {
    if (!id) {
      this.id = v4();
    }
  }

  abstract attack(): Number;

  get getId() {
    return this.id;
  }

  get getLife() {
    return this.life;
  }

  get getName() {
    return this.name;
  }

  get getProfession() {
    return this.profession;
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
