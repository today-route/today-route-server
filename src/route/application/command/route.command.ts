import { CreateGeoCoordCommand } from './geoCoord.command';
import { CreateRoutePhotoCommand } from './routePhoto.command';

export class CreateRouteCommand {
  coupleId: number;
  date: Date;
  title: string;
  content: string;
  zoomLevel: number;
  location?: string;
  geoCoord: CreateGeoCoordCommand[];
  routePhoto: CreateRoutePhotoCommand[];

  constructor(data: {
    coupleId: number;
    date: string;
    title: string;
    content: string;
    zoomLevel: string;
    location?: string;
    geoCoord: string[][];
    routePhoto: string[];
  }) {
    this.coupleId = data.coupleId;
    this.date = new Date(data.date);
    this.title = data.title;
    this.content = data.content;
    this.zoomLevel = parseFloat(data.zoomLevel);
    this.location = data.location;
    this.geoCoord = data.geoCoord.map(
      (e) => new CreateGeoCoordCommand({ longitude: e[0], latitude: e[1] }),
    );
    this.routePhoto = data.routePhoto.map(
      (e) => new CreateRoutePhotoCommand({ url: e }),
    );
  }
}
