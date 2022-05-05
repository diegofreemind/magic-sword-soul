import { ICharacterUseCase } from '../../shared/interfaces/ICharacterUseCase';
import { IBattleRepository } from '../../repositories/IBattleRepository';
import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { IMethodCalculate } from '../../shared/interfaces/battle';
import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';
import Battle from '../../entities/Battle';
import Round from '../../entities/Round';

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

  async doRound(props: PerformRoundDTO) {
    // TODO: perform attack -> subtract life ( turn )
    // TODO: generate event ( types ) -> start | attacks | end
  }

  async startBattle(battleId: string) {
    const battle = await this.battleRepository.findById(battleId);

    if (battle) {
      return this.sortFasterPlayer(battle);
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
