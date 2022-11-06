import RouteEntity from './route.entity';

export default class GeoCoordEntity {
  constructor(geoCoord: {
    id: number;
    longitude: number;
    latitude: number;
    route?: RouteEntity;
  }) {
    this.id = geoCoord.id;
    this.longitude = geoCoord.longitude;
    this.latitude = geoCoord.latitude;
    this.route = geoCoord.route;
  }

  id: number;
  longitude: number;
  latitude: number;
  route?: RouteEntity;
}
