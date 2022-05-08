import { CharacterUseCaseAdapter } from '../../shared/adapters/CharacterUseCaseAdapter';

import {
  battleRepository,
  roundRepository,
} from '../../repositories/implementations';

import PerformBattleUseCase from './PerformBattleUseCase';
import PerformBattleController from './BattleController';
import PerformRoundController from './RoundController';

const characterUseCase = new CharacterUseCaseAdapter();

const performBattleUseCase = new PerformBattleUseCase(
  battleRepository,
  characterUseCase,
  roundRepository
);

const battleController = new PerformBattleController(performBattleUseCase);
const roundController = new PerformRoundController(performBattleUseCase);

export { battleController, roundController, performBattleUseCase };
