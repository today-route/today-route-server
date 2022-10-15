import { IsDateString, IsInt } from 'class-validator';
import { DTO_VALIDATION_ERROR_MESSAGE } from 'src/constants/errorMessage';

export class CreateCoupleDao {
  @IsDateString({}, { message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly startDate: string;

  @IsInt({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly boyId: number;

  @IsInt({ message: DTO_VALIDATION_ERROR_MESSAGE })
  readonly girlId: number;
}
