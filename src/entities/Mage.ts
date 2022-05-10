import {
  MAGE_LIFE_DEFAULT,
  MAGE_SKILL_DEFAULT,
  MAGE_STRENGTH_DEFAULT,
  MAGE_INTELLIGENCE_DEFAULT,
} from '../shared/constants/character';

import {
  MAGE_ATTACK_SKILL_PERCENTAGE,
  MAGE_ATTACK_STRENGTH_PERCENTAGE,
  MAGE_ATTACK_INTELLIGENCE_PERCENTAGE,
} from '../shared/constants/character';

import {
  MAGE_SPEED_STRENGTH_PERCENTAGE,
  MAGE_SPEED_SKILL_PERCENTAGE,
} from '../shared/constants/character';

import { CharacterStatus, Professions } from '../shared/enums/Character';
import { MageLabels } from '../shared/templates/CharacterLabels';
import { Character } from './Character';

export default class Mage extends Character {
  constructor(
    readonly name: string,
    identifier?: string,
    status?: CharacterStatus
  ) {
    super(
      name,
      Professions.Mage,
      MAGE_LIFE_DEFAULT,
      MAGE_SKILL_DEFAULT,
      MAGE_STRENGTH_DEFAULT,
      MAGE_INTELLIGENCE_DEFAULT,
      identifier,
      status
    );
  }

  labels() {
    return MageLabels({
      attackProps: {
        attackSkill: {
          value: MAGE_SKILL_DEFAULT,
          percentage: MAGE_ATTACK_SKILL_PERCENTAGE,
        },
        attackStrength: {
          value: MAGE_STRENGTH_DEFAULT,
          percentage: MAGE_ATTACK_STRENGTH_PERCENTAGE,
        },
        attackIntelligence: {
          value: MAGE_INTELLIGENCE_DEFAULT,
          percentage: MAGE_ATTACK_INTELLIGENCE_PERCENTAGE,
        },
      },
      speedProps: {
        speedSkill: {
          value: MAGE_SKILL_DEFAULT,
          percentage: MAGE_SPEED_SKILL_PERCENTAGE,
        },
        speedStrength: {
          value: MAGE_STRENGTH_DEFAULT,
          percentage: MAGE_SPEED_STRENGTH_PERCENTAGE,
        },
      },
    });
  }

  speed(): number {
    return (
      MAGE_STRENGTH_DEFAULT * MAGE_SPEED_STRENGTH_PERCENTAGE +
      MAGE_SKILL_DEFAULT * MAGE_SPEED_SKILL_PERCENTAGE
    );
  }

  attack(): number {
    return (
      MAGE_SKILL_DEFAULT * MAGE_ATTACK_SKILL_PERCENTAGE +
      MAGE_STRENGTH_DEFAULT * MAGE_ATTACK_STRENGTH_PERCENTAGE +
      MAGE_INTELLIGENCE_DEFAULT * MAGE_ATTACK_INTELLIGENCE_PERCENTAGE
    );
  }
}
