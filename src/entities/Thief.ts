import {
  THIEF_LIFE_DEFAULT,
  THIEF_SKILL_DEFAULT,
  THIEF_STRENGTH_DEFAULT,
  THIEF_INTELLIGENCE_DEFAULT,
} from '../shared/constants/character';

import {
  THIEF_SPEED_SKILL_PERCENTAGE,
  THIEF_ATTACK_SKILL_PERCENTAGE,
  THIEF_ATTACK_STRENGTH_PERCENTAGE,
  THIEF_ATTACK_INTELLIGENCE_PERCENTAGE,
} from '../shared/constants/character';

import { CharacterStatus, Professions } from '../shared/enums/Character';
import { ThiefLabels } from '../shared/templates/CharacterLabels';
import { Character } from './Character';

export default class Thief extends Character {
  constructor(
    readonly name: string,
    identifier?: string,
    status?: CharacterStatus
  ) {
    super(
      name,
      Professions.Thief,
      THIEF_LIFE_DEFAULT,
      THIEF_SKILL_DEFAULT,
      THIEF_STRENGTH_DEFAULT,
      THIEF_INTELLIGENCE_DEFAULT,
      identifier,
      status
    );
  }

  labels() {
    return ThiefLabels({
      attackProps: {
        attackSkill: {
          value: THIEF_SKILL_DEFAULT,
          percentage: THIEF_ATTACK_SKILL_PERCENTAGE,
        },
        attackStrength: {
          value: THIEF_STRENGTH_DEFAULT,
          percentage: THIEF_ATTACK_STRENGTH_PERCENTAGE,
        },
        attackIntelligence: {
          value: THIEF_INTELLIGENCE_DEFAULT,
          percentage: THIEF_ATTACK_INTELLIGENCE_PERCENTAGE,
        },
      },
      speedProps: {
        speedSkill: {
          value: THIEF_SKILL_DEFAULT,
          percentage: THIEF_SPEED_SKILL_PERCENTAGE,
        },
      },
    });
  }

  speed(): number {
    return THIEF_SKILL_DEFAULT * THIEF_SPEED_SKILL_PERCENTAGE;
  }

  attack(): number {
    return (
      THIEF_SKILL_DEFAULT +
      THIEF_STRENGTH_DEFAULT * THIEF_ATTACK_STRENGTH_PERCENTAGE +
      THIEF_INTELLIGENCE_DEFAULT * THIEF_ATTACK_INTELLIGENCE_PERCENTAGE
    );
  }
}
