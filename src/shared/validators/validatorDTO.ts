import { BadRequestException } from '../exceptions/BadRequestException';
import { ClassConstructor, instanceToPlain } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  const targetClass = instanceToPlain(dto, obj);
  const errors: ValidationError[] = await validate(targetClass);

  if (errors.length > 0) {
    const details = errors.map((error: ValidationError) => {
      if (error?.constraints) {
        return Object.values(error.constraints);
      }
    });

    throw new BadRequestException(details.join(', '));
  }
};
