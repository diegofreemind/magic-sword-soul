import { IRoundLog } from '../interfaces/IPerformRound';

export const RoundFastestPlayerSelected = (params: IRoundLog) =>
  `${params.offensivePlayerName} (${params.offensiveCalculatedSpeed}) foi mais veloz que o ${params.defensivePlayerName} (${params.defensiveCalculatedSpeed}), e irá começar!`;

export const RoundAttackPerformed = (params: IRoundLog) =>
  `${params.offensivePlayerName} atacou ${params.defensivePlayerName} com ${params.calculatedAttack} de dano, ${params.defensivePlayerName} com ${params.calculatedDamage} pontos de vida restantes;`;

export const RoundFinishedBattle = (params: IRoundLog) =>
  `${params.winnerPlayerName} venceu a batalha! ${params.winnerPlayerName} ainda tem ${params.calculatedDamage} pontos de vida restantes!`;
