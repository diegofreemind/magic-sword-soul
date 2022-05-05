import Battle from '../../src/entities/Battle';
import { IBattleRepository } from '../../src/repositories/IBattleRepository';

export class BattleRepositoryFake implements IBattleRepository {
  save(battle: Battle): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Battle> {
    throw new Error('Method not implemented.');
  }
}
