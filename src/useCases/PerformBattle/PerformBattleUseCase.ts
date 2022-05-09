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
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';
import { isUUID } from 'class-validator';

import {
  IMethodCalculate,
  IBattleState,
} from '../../shared/interfaces/IPerformBattle';

import { IRoundState } from '../../shared/interfaces/IPerformRound';
import { CharacterStatus } from '../../shared/enums/Character';

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

      const battleState = { battle, round: initialRound };
      this.checkBattleState(battleState, offensive, defensive);

      battle.setStatus = BattleStatus.Active;
      await this.roundRepository.save(initialRound);

      await this.battleRepository.update(battle.getId, {
        starterPlayer: battle.getStarterPlayer,
        status: battle.getStatus,
      });

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
        throw new UnprocessableException(`The battle ${battleId} is closed `);
      case BattleStatus.Active:
        return this.runActiveBattle(battle, offensive, defensive);
      case BattleStatus.Finished:
        throw new UnprocessableException(`The battle ${battleId} is finished`);
      default:
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

    // TODO: review log infos
    // console.log(RoundAttackPerformed);

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

  checkBattleState(state: IBattleState, offensive: string, defensive: string) {
    const { battle, round: lastRound } = state;

    const executedRounds = battle.getRounds!.filter(
      (r) => r.type !== RoundType.Initial
    );

    const totalOfRounds = executedRounds.length;
    const lastRoundType = lastRound?.getType;
    const isInitialRound = lastRoundType === RoundType.Initial;
    const isActiveBattle = battle.getStatus === BattleStatus.Active;

    if (!battle.getStarterPlayer) {
      throw new UnprocessableException(
        `The starter player was not defined, please execute the Battle to initialize`
      );
    }

    if (isInitialRound && isActiveBattle) {
      throw new UnprocessableException('The battle is already active');
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

  async setBattleState(battleState: IBattleState, roundState: IRoundState) {
    const { battle, round } = battleState;
    const currentRound = { id: round.getId, type: round.getType! };
    const { calculatedAttack, calculatedDamage, executedDamage } = roundState;

    battle.setRounds = currentRound;
    round.setCalculatedAttack = calculatedAttack;
    round.setCalculatedDamage = calculatedDamage;

    await this.roundRepository.save(round);

    if (executedDamage.calculated <= 0) {
      await this.endBattleState(battle);
      await this.endBattlePlayersState(battle.getPlayers);

      console.log({ endBattle: battle });
    }

    console.log({ battle });
    await this.battleRepository.update(battle.getId, {
      rounds: battle.getRounds,
      status: battle.getStatus,
      players: battle.getPlayers,
    });
  }

  async endBattleState(battle: Battle) {
    const battlePlayers = battle.getPlayers;
    const winner = battlePlayers.find(
      (p) => p.getStatus === CharacterStatus.Alive
    );

    if (winner) {
      battle.setWinnerPlayer = winner.getId;
      battle.setStatus = BattleStatus.Finished;
    }
  }

  async endBattlePlayersState(players: Character[]) {
    for (const index in players) {
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

  async getBattleLog(battleId: string) {
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
