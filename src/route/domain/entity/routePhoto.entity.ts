import RouteEntity from './route.entity';

export default class RoutePhotoEntity {
  constructor(routePhoto: { id: number; url: string; route?: RouteEntity }) {
    this.id = routePhoto.id;
    this.url = routePhoto.url;
    this.route = routePhoto.route;
  }

  id: number;
  url: string;
  route?: RouteEntity;
}
