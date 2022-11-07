import RoutePhotoEntity from '../entity/routePhoto.entity';

export default class RoutePhotoDto {
  constructor(entity: RoutePhotoEntity) {
    this.id = entity.id;
    this.url = entity.url;
  }

  id: number;
  url: string;
}
