import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  const targetClass = plainToClass(dto, obj);
  const errors = await validate(targetClass);

  if (errors.length > 0) {
    throw new TypeError(`${errors.map(({ property }) => property)}`);
  }
};
