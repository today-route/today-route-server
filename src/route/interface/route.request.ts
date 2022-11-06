import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRouteRequest {
  @IsDateString({}, { message: '날짜' })
  date: string;

  @IsString({ message: '제목' })
  title: string;

  @IsString({ message: '내용' })
  content: string;

  @IsNumberString({ message: 'zoom level' })
  zoomLevel: string;

  @IsOptional()
  @IsString({ message: '지역' })
  location?: string;

  @IsArray()
  geoCoord: string[][];
}
