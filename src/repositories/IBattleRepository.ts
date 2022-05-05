import Battle from '../entities/Battle';

export interface IBattleRepository {
  save(battle: Battle): Promise<void>;
  findById(id: string): Promise<Battle | undefined>;
}
