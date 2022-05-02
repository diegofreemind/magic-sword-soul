import { CharacterStatus, Professions } from '../shared/enums/Character';
import { Character } from './Character';

export const WARRIOR_LIFE_DEFAULT = 20;
export const WARRIOR_SKILL_DEFAULT = 5;
export const WARRIOR_STRENGTH_DEFAULT = 10;
export const WARRIOR_INTELLIGENCE_DEFAULT = 5;

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

  // TODO: think about magic numbers *( code smells )

  speed(): number {
    return WARRIOR_SKILL_DEFAULT * 0.6 + WARRIOR_INTELLIGENCE_DEFAULT * 0.2;
  }

  attack(): number {
    return WARRIOR_STRENGTH_DEFAULT * 0.8 + WARRIOR_SKILL_DEFAULT * 0.2;
  }
}
