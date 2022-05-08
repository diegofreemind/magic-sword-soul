import { ICharacterRepository } from '../../repositories/interfaces/ICharacterRepository';
import { UnprocessableException } from '../../shared/exceptions/UnprocessableException';
import { validatorDto } from '../../shared/validators/validatorDTO';
import { UpdateCharacterDTO } from './UpdateCharacterDTO';

export default class UpdateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}
  async execute(id: string, params: UpdateCharacterDTO | any): Promise<void> {
    if (params?.name || params.id) {
      throw new UnprocessableException(
        `The [${Object.keys(params)}] props are not allowed for updates`
      );
    }

    await validatorDto(UpdateCharacterDTO, params);

    return this.characterRepository.update(id, params);
  }
}
