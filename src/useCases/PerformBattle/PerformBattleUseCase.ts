import { UnprocessableException } from '../../shared/exceptions/UnprocessableException';
import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { NotFoundException } from '../../shared/exceptions/NotFoundException';

import { ICharacterUseCase } from '../../shared/adapters/ICharacterUseCase';
import { IBattleRepository } from '../../repositories/IBattleRepository';
import { IRoundRepository } from '../../repositories/IRoundRepository';

import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { BattleStatus } from '../../shared/enums/Battle';
import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';
import { isUUID } from 'class-validator';

import {
  IMethodCalculate,
  IBattleState,
  IRoundState,
} from '../../shared/interfaces/IPerformBattle';

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
        `Could not create the battle for ${Object.values(props)}`
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
      const fastestPlayer = this.sortFasterPlayer(battle);

      battle.setStatus = BattleStatus.Active;
      battle.setStarterPlayer = fastestPlayer.id;
      await this.battleRepository.update(battle.getId, battle);

      // TODO: persist into log ( without conflicts )
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

    if (lastRound?.getOffensive === offensive) {
      throw new UnprocessableException(
        `This turn is defensive for ${offensive} player`
      );
    }

    const timestamp = new Date().toISOString();
    const round = new Round(battle.getId, timestamp, offensive, defensive);

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
    const { calculatedAttack, calculatedDamage, executedDamage } = roundState;

    battle.setRounds = round.getId;
    round.setCalculatedAttack = calculatedAttack;
    round.setCalculatedDamage = calculatedDamage;

    if (executedDamage.calculated <= 0) {
      battle.setStatus = BattleStatus.Finished;

      const damagedPlayer = battle.getPlayers.find(
        (player) => player.getId === executedDamage.id
      );

      await this.characterUseCase.updateCharacterById(
        executedDamage.id,
        damagedPlayer!
      );
    }

    await this.battleRepository.update(battle.getId, battle);
    await this.roundRepository.save(round);
  }

  async getLastMove(battle: Battle): Promise<Round | undefined> {
    const rounds = battle.getRounds.length - 1;
    const lastRoundId = battle.getRounds[rounds];

    if (lastRoundId) {
      return this.roundRepository.findById(lastRoundId);
    }
  }

  sortFasterPlayer(battle: Battle): IMethodCalculate {
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

    const [fastestPlayer] = sortedByFasterPlayer.reverse();
    return fastestPlayer;
  }
}
