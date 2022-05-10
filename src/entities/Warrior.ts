import {
  WARRIOR_LIFE_DEFAULT,
  WARRIOR_SKILL_DEFAULT,
  WARRIOR_STRENGTH_DEFAULT,
  WARRIOR_INTELLIGENCE_DEFAULT,
} from '../shared/constants/character';

import {
  WARRIOR_ATTACK_SKILL_PERCENTAGE,
  WARRIOR_ATTACK_STRENGTH_PERCENTAGE,
  WARRIOR_SPEED_INTELLIGENCE_PERCENTAGE,
  WARRIOR_SPEED_SKILL_PERCENTAGE,
} from '../shared/constants/character';

import { CharacterStatus, Professions } from '../shared/enums/Character';
import { WarriorLabels } from '../shared/templates/CharacterLabels';
import { Character } from './Character';

export default class Warrior extends Character {
  constructor(
    readonly name: string,
    identifier?: string,
    status?: CharacterStatus
  ) {
    super(
      name,
      Professions.Warrior,
      WARRIOR_LIFE_DEFAULT,
      WARRIOR_SKILL_DEFAULT,
      WARRIOR_STRENGTH_DEFAULT,
      WARRIOR_INTELLIGENCE_DEFAULT,
      identifier,
      status
    );
  }

  labels() {
    return WarriorLabels({
      attackProps: {
        attackSkill: {
          value: WARRIOR_SKILL_DEFAULT,
          percentage: WARRIOR_ATTACK_SKILL_PERCENTAGE,
        },
        attackStrength: {
          value: WARRIOR_STRENGTH_DEFAULT,
          percentage: WARRIOR_ATTACK_STRENGTH_PERCENTAGE,
        },
      },
      speedProps: {
        speedSkill: {
          value: WARRIOR_SKILL_DEFAULT,
          percentage: WARRIOR_SPEED_SKILL_PERCENTAGE,
        },
        speedIntelligence: {
          value: WARRIOR_INTELLIGENCE_DEFAULT,
          percentage: WARRIOR_SPEED_INTELLIGENCE_PERCENTAGE,
        },
      },
    });
  }

  speed(): number {
    return (
      WARRIOR_SKILL_DEFAULT * WARRIOR_SPEED_SKILL_PERCENTAGE +
      WARRIOR_INTELLIGENCE_DEFAULT * WARRIOR_SPEED_INTELLIGENCE_PERCENTAGE
    );
  }

  attack(): number {
    return (
      WARRIOR_STRENGTH_DEFAULT * WARRIOR_ATTACK_STRENGTH_PERCENTAGE +
      WARRIOR_SKILL_DEFAULT * WARRIOR_ATTACK_SKILL_PERCENTAGE
    );
  }
}
