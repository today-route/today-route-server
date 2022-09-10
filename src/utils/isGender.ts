import { registerDecorator, ValidationOptions } from 'class-validator';
import { DTO_VALIDATION_ERROR_MESSAGE } from 'src/constants/errorMessage';

export function IsGender(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsGender',
      target: object.constructor,
      propertyName,
      options: { ...validationOptions, message: DTO_VALIDATION_ERROR_MESSAGE },
      constraints: [],
      validator: {
        validate(value: any) {
          return typeof value === 'string' && (value === 'M' || value === 'F');
        },
      },
    });
  };
}
