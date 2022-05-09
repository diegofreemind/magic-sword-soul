import {
  MAGE_LIFE_DEFAULT,
  MAGE_SKILL_DEFAULT,
  MAGE_STRENGTH_DEFAULT,
  MAGE_INTELLIGENCE_DEFAULT,
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
      skill: MAGE_SKILL_DEFAULT,
      strength: MAGE_STRENGTH_DEFAULT,
      intelligence: MAGE_INTELLIGENCE_DEFAULT,
    });
  }

  speed(): number {
    return MAGE_STRENGTH_DEFAULT * 0.2 + MAGE_SKILL_DEFAULT * 0.5;
  }

  attack(): number {
    return (
      MAGE_SKILL_DEFAULT * 0.5 +
      MAGE_STRENGTH_DEFAULT * 0.2 +
      MAGE_INTELLIGENCE_DEFAULT * 1.5
    );
  }
}
