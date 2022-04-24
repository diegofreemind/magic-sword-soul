import { Character } from './Character';

// TODO: import class-validator

export const WARRIOR_LIFE_DEFAULT = 20;
export const WARRIOR_SKILL_DEFAULT = 5;
export const WARRIOR_STRENGTH_DEFAULT = 10;
export const WARRIOR_INTELLIGENCE_DEFAULT = 5;

export default class Warrior extends Character {
  constructor(readonly name: string) {
    super(
      WARRIOR_LIFE_DEFAULT,
      WARRIOR_SKILL_DEFAULT,
      WARRIOR_STRENGTH_DEFAULT,
      WARRIOR_INTELLIGENCE_DEFAULT
    );
  }

  // TODO: think about magic numbers *( code smells )

  attack(): Number {
    return WARRIOR_STRENGTH_DEFAULT * 0.8 + WARRIOR_SKILL_DEFAULT * 0.2;
  }
}
