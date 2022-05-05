import Battle from '../../src/entities/Battle';
import { IBattleRepository } from '../../src/repositories/IBattleRepository';
import { IBattle } from '../../src/shared/interfaces/battle';

export class BattleRepositoryFake implements IBattleRepository {
  update(id: string, payload: IBattle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  save(battle: Battle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Battle> {
    throw new Error('Method not implemented.');
  }
}
