import { ICharacterRepository } from '../../repositories/ICharacterRepository';
import { MIN_BATTLE_CHARACTERS } from '../../shared/constants/battlefield';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { BattleStatus } from '../../shared/enums/Battle';
import { PerformBattleDTO } from './PerformBattleDTO';
import { Character } from '../../entities/Character';
import { PerformRoundDTO } from './PerformRoundDTO';
import Battle from '../../entities/Battle';

export default class PerformBattleUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async createBattle(props: PerformBattleDTO) {
    await validatorDto(PerformBattleDTO, props);

    const playersAsPromise = props.players.map((id) =>
      this.characterRepository.findById(id)
    );

    const characters = await Promise.all(playersAsPromise);

    if (characters) {
      const players = characters as Character[];
      const battle = new Battle(players, MIN_BATTLE_CHARACTERS);

      return battle;
    }

    throw new Error('Could not start the battle');
  }

  async doRound(props: PerformRoundDTO) {
    // TODO: perform attack -> subtract life ( turn )
    // TODO: generate event ( types ) -> start | attacks | end
  }

  sortNextPlayer(players: Character[], battle: Battle) {
    // TODO: sort next player by calculated_speed
    // TODO: calculateSpeed for each player ( first move - battle_closed )
    // TODO: verify last event to define next player ( always - battle_active )

    const playersCalculatedSpeed = players.map((player) => {
      return {
        id: player.getId,
        calculated: battle.calculateSpeed(player.getId),
      };
    });

    console.log({ playersCalculatedSpeed });

    return playersCalculatedSpeed;
  }
}
