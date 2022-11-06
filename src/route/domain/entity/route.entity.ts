import UserEntity from 'src/user/domain/entity/user.entity';
import RoutePhotoEntity from 'src/route/domain/entity/routePhoto.entity';
import GeoCoordEntity from './geoCoord.entity';

export default class RouteEntity {
  constructor(route: {
    id: number;
    date: Date;
    zoomLevel: number;
    title: string;
    content: string;
    location?: string;
    user?: UserEntity;
    routePhoto?: RoutePhotoEntity[];
    geoCoord: GeoCoordEntity[];
  }) {
    this.id = route.id;
    this.date = route.date;
    this.zoomLevel = route.zoomLevel;
    this.content = route.content;
    this.location = route.location;
    this.user = route.user;
    this.routePhoto = route.routePhoto;
    this.geoCoord = route.geoCoord;
  }

  id: number;
  date: Date;
  zoomLevel: number;
  title: string;
  content: string;
  location?: string;
  user?: UserEntity;
  routePhoto?: RoutePhotoEntity[];
  geoCoord?: GeoCoordEntity[];
}
