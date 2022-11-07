import RoutePhotoEntity from 'src/route/domain/entity/routePhoto.entity';
import GeoCoordEntity from './geoCoord.entity';
import CoupleEntity from 'src/user/domain/entity/couple.entity';

export default class RouteEntity {
  constructor(route: {
    id: number;
    date: Date;
    zoomLevel: number;
    title: string;
    content: string;
    location?: string;
    couple?: CoupleEntity;
    routePhoto?: RoutePhotoEntity[];
    geoCoord?: GeoCoordEntity[];
  }) {
    this.id = route.id;
    this.date = route.date;
    this.zoomLevel = route.zoomLevel;
    this.title = route.title;
    this.content = route.content;
    this.location = route.location;
    this.couple = route.couple;
    this.routePhoto = route.routePhoto;
    this.geoCoord = route.geoCoord;
    // this.geoCoord = route.geoCoord.map((e) => [e.latitude, e.longitude]);
  }

  id: number;
  date: Date;
  zoomLevel: number;
  title: string;
  content: string;
  location?: string;
  couple?: CoupleEntity;
  routePhoto?: RoutePhotoEntity[];
  // geoCoord?: number[][];
  geoCoord?: GeoCoordEntity[];
}
