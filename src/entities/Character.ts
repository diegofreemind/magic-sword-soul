// TODO: add generic props Character<T>?

import { v4 } from 'uuid';
import { Professions } from '../useCases/CreateCharacter/CharacterDTO';

export abstract class Character {
  constructor(
    protected name: string,
    protected profession: Professions,
    protected life: number,
    protected skill: number,
    protected strength: number,
    protected intelligence: number,
    protected id?: string
  ) {
    if (!id) {
      this.id = v4();
    }
  }

  abstract attack(): number;
  abstract speed(): number;

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
