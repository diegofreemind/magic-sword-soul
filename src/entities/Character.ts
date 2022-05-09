import { BaseEntity } from './BaseEntity';
import { Professions, CharacterStatus } from '../shared/enums/Character';

export abstract class Character extends BaseEntity {
  constructor(
    protected name: string,
    protected profession: Professions,
    protected life: number,
    protected skill: number,
    protected strength: number,
    protected intelligence: number,
    id?: string,
    protected status?: CharacterStatus
  ) {
    super(id);
    if (!status) {
      this.status = CharacterStatus.Alive;
    }
  }

  abstract attack(): number;
  abstract speed(): number;
  abstract labels(): { attack: string; speed: string };

  get getStatus() {
    return this.status;
  }

  set setStatus(status: CharacterStatus) {
    this.status = status;
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
