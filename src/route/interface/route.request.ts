import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsGeoCoordArray } from 'src/utils/geoCoord.validator';

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

  @IsGeoCoordArray({ message: '좌표' })
  geoCoord: string[][];
}

export class UpdateRouteRequest {
  @IsNumberString({ message: '아이디' })
  id: string;

  @IsString({ message: '제목' })
  title: string;

  @IsString({ message: '내용' })
  content: string;

  @IsNumberString({ message: 'zoom level' })
  zoomLevel: string;

  @IsOptional()
  @IsString({ message: '지역' })
  location?: string;
}
