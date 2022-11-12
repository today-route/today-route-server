import { IsDateString, IsEmail, IsString, IsUrl } from 'class-validator';
import { DTO_VALIDATION_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { Gender } from 'src/user/domain/entity/user.entity';
import { IsGender } from 'src/utils/isGender';

export class CreateUserDto {
  @IsString({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly key: string;

  @IsEmail({}, { message: '이메일을 올바르게 입력해주세요.' })
  readonly email: string;

  @IsGender({ message: '성별을 올바르게 입력해주세요.' })
  readonly gender: Gender;

  @IsString({ message: '닉네임을 올바르게 입력해주세요.' })
  readonly nickname: string;

  @IsUrl({}, { message: '프로필 이미지 경로를 올바르게 입력해주세요.' })
  readonly profileUrl: string;

  @IsDateString({}, { message: '생년월일을 올바르게 입력해주세요.' })
  readonly birthday: string;
}

export class UpdateUserDto {
  constructor(data: {
    birthday?: string;
    nickname?: string;
    profileUrl?: string;
  }) {
    if (data.birthday) {
      this.birthday = new Date(data.birthday);
    }

    this.nickname = data.nickname;
    this.profileUrl = data.profileUrl;
  }

  readonly birthday?: Date;
  readonly nickname?: string;
  readonly profileUrl?: string;
}
