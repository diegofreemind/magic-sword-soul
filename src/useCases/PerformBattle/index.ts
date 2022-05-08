import { CharacterUseCaseAdapter } from '../../shared/adapters/CharacterUseCaseAdapter';
import BattleRepository from '../../repositories/implementations/BattleRepository';
import RoundRepository from '../../repositories/implementations/RoundRepository';

import PerformBattleUseCase from './PerformBattleUseCase';
import PerformBattleController from './BattleController';
import PerformRoundController from './RoundController';

const roundRepository = new RoundRepository();
const battleRepository = new BattleRepository();
const characterUseCase = new CharacterUseCaseAdapter();

const performBattleUseCase = new PerformBattleUseCase(
  battleRepository,
  characterUseCase,
  roundRepository
);

const battleController = new PerformBattleController(performBattleUseCase);
const roundController = new PerformRoundController(performBattleUseCase);

export { battleController, roundController, performBattleUseCase };
