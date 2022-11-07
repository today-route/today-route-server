import RouteEntity from '../entity/route.entity';
import RoutePhotoDto from './routePhoto.dto';

export default class RouteDto {
  constructor(entity: RouteEntity) {
    this.id = entity.id;
    this.date = entity.date;
    this.zoomLevel = entity.zoomLevel;
    this.title = entity.title;
    this.content = entity.content;
    this.location = entity.location;
    this.routePhoto = entity.routePhoto?.map((e) => new RoutePhotoDto(e));
    this.geoCoord = entity.geoCoord?.map((e) => [e.latitude, e.longitude]);
  }

  id: number;
  date: Date;
  zoomLevel: number;
  title: string;
  content: string;
  location?: string;
  routePhoto?: RoutePhotoDto[];
  geoCoord?: number[][];
}
