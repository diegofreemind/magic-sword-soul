import { Professions } from '../useCases/CharacterDTO';
import { Character } from './Character';

export const MAGE_LIFE_DEFAULT = 12;
export const MAGE_SKILL_DEFAULT = 6;
export const MAGE_STRENGTH_DEFAULT = 5;
export const MAGE_INTELLIGENCE_DEFAULT = 10;

export default class Mage extends Character {
  constructor(readonly name: string, identifier?: string) {
    super(
      name,
      Professions.Mage,
      MAGE_LIFE_DEFAULT,
      MAGE_SKILL_DEFAULT,
      MAGE_STRENGTH_DEFAULT,
      MAGE_INTELLIGENCE_DEFAULT,
      identifier
    );
  }

  attack(): Number {
    return (
      MAGE_SKILL_DEFAULT * 0.5 +
      MAGE_STRENGTH_DEFAULT * 0.2 +
      MAGE_INTELLIGENCE_DEFAULT * 1.5
    );
  }
}
