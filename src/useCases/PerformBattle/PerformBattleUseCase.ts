import { UnprocessableException } from '../../shared/exceptions/UnprocessableException';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { NotFoundException } from '../../shared/exceptions/NotFoundException';

import { ICharacterUseCase } from '../../shared/adapters/ICharacterUseCase';
import { IBattleRepository } from '../../repositories/interfaces/IBattleRepository';
import { IRoundRepository } from '../../repositories/interfaces/IRoundRepository';

import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { BattleStatus, RoundType } from '../../shared/enums/Battle';

import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';

import { logger } from '../../config/logging';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';
import { isUUID } from 'class-validator';

import {
  IMethodCalculate,
  IBattleState,
} from '../../shared/interfaces/IPerformBattle';

import { IRoundLog, IRoundState } from '../../shared/interfaces/IPerformRound';
import { CharacterStatus } from '../../shared/enums/Character';

import {
  RoundFastestPlayerSelected,
  RoundAttackPerformed,
  RoundFinishedBattle,
} from '../../shared/templates/BattleLog';

export default class PerformBattleUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private characterUseCase: ICharacterUseCase,
    private roundRepository: IRoundRepository
  ) {}

  async createBattle(props: PerformBattleDTO): Promise<Battle> {
    await validatorDto(PerformBattleDTO, props);

    const playersAsPromise = props.players.map((id) =>
      this.characterUseCase.findCharacterById(id)
    );

    try {
      const characters = await Promise.all(playersAsPromise);

      const battle = new Battle(
        characters as Character[],
        MIN_BATTLE_CHARACTERS
      );

      await this.battleRepository.save(battle);
      return battle;
    } catch (error) {
      logger.error(error);
      throw new BadRequestException(
        `Could not create the battle for ${Object.values(props)} \n ${error}`
      );
    }
  }

  async executeBattle(battleId: string): Promise<Battle> {
    if (!isUUID(battleId)) {
      throw new BadRequestException(
        `The battleId: ${battleId} format is not valid`
      );
    }

    const battle = await this.battleRepository.findById(battleId);

    if (battle) {
      const [fastestPlayer, secondPlayer] = this.sortFasterPlayer(battle);

      battle.setStarterPlayer = fastestPlayer.id;
      const offensive = fastestPlayer.id;
      const defensive = secondPlayer.id;

      const initialRound = new Round(
        battleId,
        offensive,
        defensive,
        RoundType.Initial
      );

      battle.setStatus = BattleStatus.Active;
      initialRound.setCalculatedSpeed = fastestPlayer;
      initialRound.setCalculatedSpeed = secondPlayer;

      this.checkBattleState(
        { battle, round: initialRound },
        offensive,
        defensive
      );

      const roundState: IRoundState = {
        calculatedAttack: initialRound.getCalculatedAttack,
        calculatedDamage: initialRound.getCalculatedDamage,
        calculatedSpeed: initialRound.getCalculatedSpeed,
        executedDamage: undefined,
      };

      const battleState = { battle, round: initialRound };
      await this.setBattleState(battleState, roundState);

      return battle;
    } else {
      throw new NotFoundException(`The battle ${battleId} was not found`);
    }
  }

  async executeRound(props: PerformRoundDTO): Promise<IBattleState> {
    await validatorDto(PerformRoundDTO, props);
    const { offensive, defensive, battleId } = props;
    const battle = await this.battleRepository.findById(battleId);

    switch (battle?.getStatus) {
      case BattleStatus.Closed:
        logger.info(`The battle ${battleId} is closed`);
        throw new UnprocessableException(`The battle ${battleId} is closed`);
      case BattleStatus.Active:
        return this.runActiveBattle(battle, offensive, defensive);
      case BattleStatus.Finished:
        logger.info(`The battle ${battleId} is finished`);
        throw new UnprocessableException(`The battle ${battleId} is finished`);
      default:
        logger.info(`Could not process the battle ${battleId}`);
        throw new UnprocessableException(
          `Could not process the battle ${battleId}`
        );
    }
  }

  async runActiveBattle(battle: Battle, offensive: string, defensive: string) {
    const lastRound = await this.getLastMove(battle);

    this.checkBattleState({ battle, round: lastRound! }, offensive, defensive);

    const round = new Round(battle.getId, offensive, defensive);
    const calculatedAttack = battle.calculateAttack(offensive);
    const calculatedDamage = battle.calculateDamage(
      calculatedAttack,
      defensive
    );

    const remainingLife = battle.executeDamage(calculatedAttack, defensive);

    const executedDamage: IMethodCalculate = {
      id: defensive,
      calculated: remainingLife,
    };

    const roundState: IRoundState = {
      calculatedAttack,
      calculatedDamage,
      executedDamage,
    };

    const battleState: IBattleState = { battle, round };
    await this.setBattleState(battleState, roundState);

    return battleState;
  }

  async setBattleState(battleState: IBattleState, roundState: IRoundState) {
    const { battle, round } = battleState;
    const battlePlayers = battle.getPlayers;

    const { calculatedAttack, calculatedDamage, executedDamage } = roundState;
    const isFinalRound = executedDamage && executedDamage.calculated <= 0;

    const updateRoundCollection: Round[] = [];
    round.setCalculatedAttack = calculatedAttack!;
    round.setCalculatedDamage = calculatedDamage!;

    updateRoundCollection.push(round);

    if (isFinalRound) {
      const winner = battlePlayers.find(
        (player) => player.getStatus === CharacterStatus.Alive
      );

      const offensive = round.getOffensive;
      const defensive = round.getDefensive;
      battle.setWinnerPlayer = winner!.getId;
      battle.setStatus = BattleStatus.Finished;

      updateRoundCollection.push(
        new Round(battle.getId, offensive, defensive, RoundType.Closing)
      );

      await this.endBattlePlayersState(battlePlayers);
    }

    const updateAsPromise = updateRoundCollection.map(async (roundUpdate) => {
      battle.setRounds = { id: roundUpdate.getId, type: roundUpdate.getType! };
      await this.roundRepository.save(roundUpdate);
    });

    await Promise.all(updateAsPromise);

    await this.battleRepository.update(battle.getId, {
      players: battlePlayers,
      rounds: battle.getRounds,
      status: battle.getStatus,
      starterPlayer: battle.getStarterPlayer,
    });
  }

  async endBattlePlayersState(players: Character[]) {
    for (const index in players) {
      if (Object.prototype.hasOwnProperty.call(players, index)) {
        const player = players[index];
        const currentLife = player?.getLife;

        const updateParams = {
          life: currentLife > 0 ? currentLife : 0,
          status: player.getStatus,
        };

        await this.characterUseCase.updateCharacterById(
          player.getId,
          updateParams
        );
      }
    }
  }

  checkBattleState(state: IBattleState, offensive: string, defensive: string) {
    const { battle, round: lastRound } = state;

    const executedRounds = battle.getRounds!.filter(
      (r) => r.type !== RoundType.Initial
    );

    const lastRoundType = lastRound?.getType;
    const totalOfRounds = executedRounds.length;
    const isInitialRound = lastRoundType === RoundType.Initial;
    const isActiveBattle = battle.getStatus === BattleStatus.Active;

    if (!battle.getStarterPlayer) {
      throw new UnprocessableException(
        `The starter player was not defined, please execute the Battle to initialize`
      );
    }

    if (isInitialRound && !isActiveBattle) {
      throw new UnprocessableException('The battle is not active');
    }

    if (totalOfRounds > 0 && !lastRound) {
      throw new NotFoundException(`The last round was not found`);
    }

    if (battle.getStarterPlayer !== offensive && totalOfRounds === 0) {
      throw new UnprocessableException(
        `This initial turn is offensive for ${defensive} player`
      );
    }

    if (lastRound?.getOffensive === offensive && totalOfRounds > 0) {
      throw new UnprocessableException(
        `This turn is defensive for ${offensive} player`
      );
    }
  }

  async getBattleLog(battleId: string) {
    const { rounds, battle } = await this.getBattleResources(battleId);

    if (!rounds || !battle) {
      throw new BadRequestException(`Log not found for battle ${battleId}`);
    }

    const initialRound = rounds.find((r) => r.getType === RoundType.Initial);
    const closingRound = rounds.find((r) => r.getType === RoundType.Closing);
    const onGoingRounds = rounds.filter((r) => r.getType === RoundType.OnGoing);

    logger.debug({ initialRound, onGoingRounds, closingRound });

    const initialPlayersState = this.getDetailedPlayer(
      battle?.getPlayers!,
      initialRound!
    );

    const finalRound = this.generateClosingRoundLog(closingRound!, battle!);

    const firstRound = this.generateInitialRoundLog(initialRound!, {
      offensivePlayerName: initialPlayersState.players.offensive?.getName,
      defensivePlayerName: initialPlayersState.players.defensive?.getName,
    });

    const intermediateRounds = onGoingRounds.map((round) => {
      const { players } = this.getDetailedPlayer(battle?.getPlayers!, round);
      const offensivePlayerName = players.offensive?.getName;
      const defensivePlayerName = players.defensive?.getName;

      return this.generateOnGoingRoundLog(round!, {
        offensivePlayerName,
        defensivePlayerName,
      });
    });

    const finalMessage = finalRound.message ?? finalRound.winnerPlayerName;
    const messages = intermediateRounds.map((item) => item.message);

    return {
      battleId,
      winner: finalRound.winnerPlayerName,
      summary: {
        rounds: [firstRound, intermediateRounds, finalRound],
      },
      text: [firstRound.message, ...messages, finalMessage],
    };
  }

  generateInitialRoundLog(round: Round, params: IRoundLog) {
    const { offensivePlayerName, defensivePlayerName } = params;
    const calculatedSpeed = round?.getCalculatedSpeed;

    const defensiveCalculatedSpeed = calculatedSpeed?.defensive?.calculated;
    const offensiveCalculatedSpeed = calculatedSpeed?.offensive?.calculated;

    const roundFastestPlayerSelected = RoundFastestPlayerSelected({
      offensivePlayerName,
      defensivePlayerName,
      defensiveCalculatedSpeed,
      offensiveCalculatedSpeed,
    });

    return {
      message: roundFastestPlayerSelected,
      metadata: {
        id: round?.getId,
        timestamp: round?.getTimestamp,
        type: round?.getType,
      },
    };
  }

  generateOnGoingRoundLog(round: Round, params: IRoundLog) {
    const { offensivePlayerName, defensivePlayerName } = params;

    const damage = round?.getCalculatedDamage;

    const roundAttackPerformed = RoundAttackPerformed({
      offensivePlayerName,
      defensivePlayerName,
      calculatedAttack: round.getCalculatedAttack,
      calculatedDamage: damage! > 0 ? damage : 0,
    });

    return {
      message: roundAttackPerformed,
      metadata: {
        id: round?.getId,
        timestamp: round?.getTimestamp,
        type: round?.getType,
      },
    };
  }

  generateClosingRoundLog(round: Round, battle: Battle) {
    const winnerPlayerId = battle?.getWinnerPlayer;
    const winnerPlayer = battle?.getPlayers.find(
      (player) => player.getId === winnerPlayerId
    );

    const winnerPlayerName = winnerPlayer?.getName;
    const winnerRemainingLife = winnerPlayer?.getLife;

    const roundFinishedBattle = RoundFinishedBattle({
      winnerPlayerName,
      calculatedDamage: winnerRemainingLife,
    });

    return {
      winnerPlayerName,
      message: roundFinishedBattle,
      metadata: {
        id: round?.getId,
        timestamp: round?.getTimestamp,
        type: round?.getType,
      },
    };
  }

  getDetailedPlayer(players: Character[], round: Round) {
    const offensive = players.find((i) => i.getId === round?.getOffensive);
    const defensive = players.find((i) => i.getId === round?.getDefensive);

    return { players: { offensive, defensive } };
  }

  async getBattleResources(battleId: string) {
    const rounds = await this.roundRepository.find({ battleId });
    const battle = await this.battleRepository.findById(battleId);

    return { rounds, battle };
  }

  async getLastMove(battle: Battle): Promise<Round | undefined> {
    const rounds = battle.getRounds.length - 1;
    const lastRound = battle.getRounds[rounds];

    if (lastRound) {
      const lastRoundId = lastRound.id;
      return this.roundRepository.findById(lastRoundId);
    }
  }

  sortFasterPlayer(battle: Battle): IMethodCalculate[] {
    const sorted = battle.getPlayers.map((player) => {
      return {
        id: player.getId,
        calculated: battle.calculateSpeed(player.getId),
      };
    });

    const sortedByFasterPlayer = sorted.sort(
      (a, b) => a.calculated - b.calculated
    );

    const isSameSpeed = sortedByFasterPlayer
      .map((i) => i.calculated)
      .find(
        (value, index, arr) => arr.indexOf(value) !== arr.lastIndexOf(value)
      );

    if (isSameSpeed) {
      console.log('The calculated_speed was the same for both players');
      return this.sortFasterPlayer(battle);
    }

    const playersSpeed = sortedByFasterPlayer.reverse();
    return playersSpeed;
  }
}
