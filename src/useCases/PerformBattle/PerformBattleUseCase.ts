import { BadRequestException } from '../../shared/exceptions/BadRequestException';
import { ICharacterUseCase } from '../../shared/interfaces/ICharacterUseCase';
import { IBattleRepository } from '../../repositories/IBattleRepository';
import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { IMethodCalculate } from '../../shared/interfaces/battle';
import { BattleStatus } from '../../shared/enums/Battle';
import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';
import { isUUID } from 'class-validator';

export default class PerformBattleUseCase {
  constructor(
    private battleRepository: IBattleRepository,
    private characterUseCase: ICharacterUseCase
  ) {}

  async createBattle(props: PerformBattleDTO) {
    await validatorDto(PerformBattleDTO, props);

    const playersAsPromise = props.players.map((id) =>
      this.characterUseCase.findCharacterById(id)
    );

    const characters = await Promise.all(playersAsPromise);
    const battle = new Battle(characters as Character[], MIN_BATTLE_CHARACTERS);

    await this.battleRepository.save(battle);
    return battle;
  }

  async executeRound(props: PerformRoundDTO) {
    await validatorDto(PerformRoundDTO, props);

    const { offensive, defensive, battleId } = props;
    const battle = await this.battleRepository.findById(battleId);

    if (battle) {
      const round = new Round(
        battle.getId,
        new Date().toISOString(),
        offensive,
        defensive
      );

      const calculatedAttack = battle.calculateAttack(offensive);
      const calculatedDamage = battle.calculateDamage(
        calculatedAttack,
        defensive
      );

      // TODO: generate event ( types ) -> start | attacks | end
      round.setCalculatedAttack = calculatedAttack;
      round.setCalculatedDamage = calculatedDamage;

      return round;
    }

    throw new Error(`The battle ${battleId} was not found`);
  }

  async executeBattle(battleId: string) {
    if (!isUUID(battleId)) {
      throw new BadRequestException('The battleId format is not valid');
    }

    const battle = await this.battleRepository.findById(battleId);

    if (battle) {
      // TODO: apply initialization rules
      const sortedPlayersBySpeed = this.sortFasterPlayer(battle);

      // TODO: update the battle status to active
      await this.battleRepository.update(battle.getId, {
        status: BattleStatus.Active,
      });

      // TODO: persist into log ( without conflicts )
      return sortedPlayersBySpeed;
    }

    throw new Error(`The battle ${battleId} was not found`);
  }

  sortFasterPlayer(battle: Battle): Function | IMethodCalculate {
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

    console.log({ isSameSpeed, sortedByFasterPlayer });

    if (isSameSpeed) {
      console.log('The calculated_speed was the same for both');
      return this.sortFasterPlayer(battle);
    }

    const [fastestPlayer] = sortedByFasterPlayer;
    return fastestPlayer;
  }

  sortNextPlayer(battle: Battle): string {
    // TODO: sort next player by calculated_speed
    // TODO: calculateSpeed for each player ( first move - battle_closed )
    // TODO: verify last event to define next player ( always - battle_active )

    return '';
  }
}
