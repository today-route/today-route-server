import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsString({ message: '닉네임을 올바르게 입력해주세요.' })
  readonly nickname?: string;
}
