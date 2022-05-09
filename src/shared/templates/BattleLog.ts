import { IRoundLog } from '../interfaces/IPerformBattle';

export const RoundFastestPlayerSelected = (params: IRoundLog) =>
  `${params.offensive} (${params.offensiveCalculatedSpeed}) foi mais veloz que
   o ${params.defensive} (${params.defensiveCalculatedSpeed}), e irá começar!`;

export const RoundAttackPerformed = (params: IRoundLog) =>
  `${params.offensive} atacou ${params.defensive} com ${params.calculatedAttack} 
  de dano, ${params.defensive} com ${params.calculatedDamage} pontos de vida restantes;`;

export const RoundFinishedBattle = (params: IRoundLog) =>
  `${params.winner} venceu a batalha! ${params.winner} 
  ainda tem ${params.calculatedDamage} pontos de vida restantes!`;
