import {
  WARRIOR_LIFE_DEFAULT,
  WARRIOR_SKILL_DEFAULT,
  WARRIOR_STRENGTH_DEFAULT,
  WARRIOR_INTELLIGENCE_DEFAULT,
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
      skill: WARRIOR_SKILL_DEFAULT,
      strength: WARRIOR_STRENGTH_DEFAULT,
      intelligence: WARRIOR_INTELLIGENCE_DEFAULT,
    });
  }

  speed(): number {
    return WARRIOR_SKILL_DEFAULT * 0.6 + WARRIOR_INTELLIGENCE_DEFAULT * 0.2;
  }

  attack(): number {
    return WARRIOR_STRENGTH_DEFAULT * 0.8 + WARRIOR_SKILL_DEFAULT * 0.2;
  }
}
