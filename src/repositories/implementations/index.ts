import CharacterRepository from './CharacterRepository';
import BattleRepository from './BattleRepository';
import RoundRepository from './RoundRepository';

let characterRepository: CharacterRepository;
let battleRepository: BattleRepository;
let roundRepository: RoundRepository;

export function initializeRepositories() {
  characterRepository = new CharacterRepository();
  battleRepository = new BattleRepository();
  roundRepository = new RoundRepository();
}

export { characterRepository, battleRepository, roundRepository };
