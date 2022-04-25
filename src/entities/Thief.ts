import { Character } from './Character';

// TODO: import class-validator

export const THIEF_LIFE_DEFAULT = 15;
export const THIEF_SKILL_DEFAULT = 10;
export const THIEF_STRENGTH_DEFAULT = 4;
export const THIEF_INTELLIGENCE_DEFAULT = 4;

export default class Thief extends Character {
  constructor(readonly name: string) {
    super(
      THIEF_LIFE_DEFAULT,
      THIEF_SKILL_DEFAULT,
      THIEF_STRENGTH_DEFAULT,
      THIEF_INTELLIGENCE_DEFAULT
    );
  }

  // TODO: think about magic numbers *( code smells )

  attack(): Number {
    return (
      THIEF_SKILL_DEFAULT +
      THIEF_STRENGTH_DEFAULT * 0.25 +
      THIEF_INTELLIGENCE_DEFAULT * 0.25
    );
  }
}
