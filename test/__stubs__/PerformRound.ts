import Battle from '../../src/entities/Battle';
import Round from '../../src/entities/Round';
import { BattleStatus, RoundType } from '../../src/shared/enums/Battle';
import { CharacterStatus } from '../../src/shared/enums/Character';

export const roundsStub = async (quantityRounds: number, battle: Battle) => {
  const roundCollection: Round[] = [];
  const [playerOne, playerTwo] = battle.getPlayers;

  battle.setStarterPlayer = playerOne.getId;
  battle.setStatus = BattleStatus.Active;

  for (let index = 0; index < quantityRounds; index++) {
    const isOddRound = index % 2 === 1 ? true : false;
    const currentOffensive = !isOddRound ? playerOne.getId : playerTwo.getId;
    const currentDefensive = isOddRound ? playerOne.getId : playerTwo.getId;

    let roundType: RoundType;

    switch (index) {
      case 0:
        roundType = RoundType.Initial;
        break;
      case quantityRounds - 1:
        roundType = RoundType.Closing;
        break;
      default:
        roundType = RoundType.OnGoing;
    }

    const round = new Round(
      battle.getId,
      currentOffensive,
      currentDefensive,
      roundType
    );

    if (round.getType === RoundType.Initial) {
      round.setCalculatedSpeed = round.getType === RoundType.Initial ? 10 : 0;
    } else if (battle.getStatus === BattleStatus.Active) {
      const calculatedAttack = battle.calculateAttack(currentOffensive);
      const calculatedDamage = battle.calculateDamage(
        calculatedAttack,
        currentDefensive
      );

      battle.executeDamage(calculatedAttack, currentDefensive);
      battle.setRounds = { id: round.getId, type: roundType };

      if (calculatedDamage <= 0) {
        const battlePlayers = battle.getPlayers;
        const winner = battlePlayers.find(
          (p) => p.getStatus === CharacterStatus.Alive
        );

        if (winner) {
          battle.setWinnerPlayer = winner.getId;
          battle.setStatus = BattleStatus.Finished;
        }

        round.setCalculatedAttack = calculatedAttack;
        round.setCalculatedDamage = calculatedDamage;
      }
    }

    roundCollection.push(round);
  }

  return { roundCollection, stubBattle: battle };
};
