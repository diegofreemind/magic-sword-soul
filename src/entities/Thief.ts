import { Professions } from '../useCases/CharacterDTO';
import { Character } from './Character';

export const THIEF_LIFE_DEFAULT = 15;
export const THIEF_SKILL_DEFAULT = 10;
export const THIEF_STRENGTH_DEFAULT = 4;
export const THIEF_INTELLIGENCE_DEFAULT = 4;

export default class Thief extends Character {
  constructor(readonly name: string, identifier?: string) {
    super(
      name,
      Professions.Thief,
      THIEF_LIFE_DEFAULT,
      THIEF_SKILL_DEFAULT,
      THIEF_STRENGTH_DEFAULT,
      THIEF_INTELLIGENCE_DEFAULT,
      identifier
    );
  }

  // TODO: think about magic numbers *( code smells )

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
