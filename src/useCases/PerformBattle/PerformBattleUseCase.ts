import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { ICharacterUseCase } from '../../shared/interfaces/ICharacterUseCase';
import { IBattleRepository } from '../../repositories/IBattleRepository';
import { IRoundRepository } from '../../repositories/IRoundRepository';

import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { IMethodCalculate } from '../../shared/interfaces/IPerformBattle';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { BattleStatus } from '../../shared/enums/Battle';
import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';
import { isUUID } from 'class-validator';
import { UnprocessableException } from '../../shared/exceptions/UnprocessableException';
import { NotFoundException } from '../../shared/exceptions/NotFoundException';

export default class PerformBattleUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private characterUseCase: ICharacterUseCase,
    private roundRepository: IRoundRepository
  ) {}

  async createBattle(props: PerformBattleDTO) {
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

  async executeBattle(battleId: string) {
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
      return fastestPlayer;
    } else {
      throw new NotFoundException(`The battle ${battleId} was not found`);
    }
  }

  async executeRound(props: PerformRoundDTO) {
    await validatorDto(PerformRoundDTO, props);

    const { offensive, defensive, battleId } = props;
    const battle = await this.battleRepository.findById(battleId);

    if (battle?.getStatus === BattleStatus.Active) {
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

      const defensiveLife = battle.executeDamage(calculatedAttack, defensive);

      battle.setRounds = round.getId;
      round.setCalculatedAttack = calculatedAttack;
      round.setCalculatedDamage = calculatedDamage;

      await this.battleRepository.update(battleId, battle);
      await this.roundRepository.save(round);

      // TODO: validate defensiveLife ( end of battle )

      // TODO: persist into log
      return round;
    } else {
      throw new UnprocessableException(`The battle ${battleId} is not active`);
    }
  }

  async checkBattleState(battle: Battle) {
    // battle.closed === executeBatte():initial
    // battle.active === executeRound():ongoing
    // battle.closed === updateStates():closing
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

    const sortedByFasterPlayer = sorted
      .sort((a, b) => a.calculated - b.calculated)
      .reverse();

    const isSameSpeed = sortedByFasterPlayer
      .map((i) => i.calculated)
      .find(
        (value, index, arr) => arr.indexOf(value) !== arr.lastIndexOf(value)
      );

    if (isSameSpeed) {
      console.log('The calculated_speed was the same for both');
      return this.sortFasterPlayer(battle);
    }

    const [fastestPlayer] = sortedByFasterPlayer;
    return fastestPlayer;
  }
}
