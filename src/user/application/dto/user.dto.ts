import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { DTO_VALIDATION_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { Gender } from 'src/user/domain/entity/user.entity';
import { IsGender } from 'src/utils/isGender';

export class CreateUserDto {
  @IsString({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly key: string;

  @IsEmail({}, { message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly email: string;

  @IsGender({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly gender: Gender;

  @IsString({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly nickname: string;

  @IsUrl({}, { message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly profileUrl: string;

  @IsDateString({}, { message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly birthday: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly nickname?: string;

  @IsOptional()
  @IsUrl({}, { message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly profileUrl?: string;
}
