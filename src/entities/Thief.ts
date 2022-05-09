import {
  THIEF_LIFE_DEFAULT,
  THIEF_SKILL_DEFAULT,
  THIEF_STRENGTH_DEFAULT,
  THIEF_INTELLIGENCE_DEFAULT,
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
      skill: THIEF_SKILL_DEFAULT,
      strength: THIEF_STRENGTH_DEFAULT,
      intelligence: THIEF_INTELLIGENCE_DEFAULT,
    });
  }

  speed(): number {
    return THIEF_SKILL_DEFAULT * 0.8;
  }

  attack(): number {
    return (
      THIEF_SKILL_DEFAULT +
      THIEF_STRENGTH_DEFAULT * 0.25 +
      THIEF_INTELLIGENCE_DEFAULT * 0.25
    );
  }
}
