// TODO: add generic props Character<T>?

import { v4 } from 'uuid';
import { Professions, CharacterStatus } from '../shared/enums/Character';

export abstract class Character {
  constructor(
    protected name: string,
    protected profession: Professions,
    protected life: number,
    protected skill: number,
    protected strength: number,
    protected intelligence: number,
    protected id?: string,
    protected status?: CharacterStatus
  ) {
    if (!status) {
      this.status = CharacterStatus.Alive;
    }
    if (!id) {
      this.id = v4();
    }
  }

  abstract attack(): number;
  abstract speed(): number;

  get getId() {
    return this.id;
  }

  get getStatus() {
    return this.status;
  }

  get getLife() {
    return this.life;
  }

  set setLife(points: number) {
    this.life = points;
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
