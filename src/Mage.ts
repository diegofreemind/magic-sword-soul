import { Character } from './Character';

// TODO: import class-validator

export const MAGE_LIFE_DEFAULT = 12;
export const MAGE_SKILL_DEFAULT = 6;
export const MAGE_STRENGTH_DEFAULT = 5;
export const MAGE_INTELLIGENCE_DEFAULT = 10;

export default class Mage extends Character {
  constructor(readonly name: string) {
    super(
      MAGE_LIFE_DEFAULT,
      MAGE_SKILL_DEFAULT,
      MAGE_STRENGTH_DEFAULT,
      MAGE_INTELLIGENCE_DEFAULT
    );
  }
}
