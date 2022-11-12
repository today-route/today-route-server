import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateCoupleRequest {
  @IsOptional()
  @IsDateString({ message: '날짜를 올바르게 입력해주세요.' })
  readonly startDate?: string;

  @IsOptional()
  @IsBoolean({ message: '이별 여부를 올바르게 입력해주세요.' })
  readonly isEnd?: boolean;
}
