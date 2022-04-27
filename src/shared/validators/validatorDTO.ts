import { BadRequestException } from '../exceptions/BadRequestException';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  const targetClass = plainToClass(dto, obj);
  const errors = await validate(targetClass);

  if (errors.length > 0) {
    const details = errors.map(({ property, constraints }) => {
      return { property, constraints };
    });
    throw new BadRequestException(`${details}`);
  }
};
