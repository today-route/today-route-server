import {
  isLatitude,
  isLongitude,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsGeoCoordArray(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsGeoCoordArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string[][]) {
          return (
            value.every((e) => e.length == 2) &&
            value.every((e) => isLatitude(e[0]) && isLongitude(e[1]))
          );
        },
      },
    });
  };
}
