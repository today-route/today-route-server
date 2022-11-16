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
      (e) => new CreateGeoCoordCommand({ latitude: e[0], longitude: e[1] }),
    );
    this.routePhoto = data.routePhoto.map(
      (e) => new CreateRoutePhotoCommand({ url: e }),
    );
  }
}

export class GetRouteListCommand {
  coupleId: number;
  year: number;
  month: number;

  constructor(data: { coupleId: number; year: string; month: string }) {
    this.coupleId = data.coupleId;
    this.year = +data.year;
    this.month = +data.month;
  }
}

export class UpdateRouteCommand {
  id: number;
  title: string;
  content: string;
  zoomLevel: number;
  location?: string;
  routePhoto: CreateRoutePhotoCommand[];

  constructor(data: {
    id: number;
    title: string;
    content: string;
    zoomLevel: string;
    location?: string;
    routePhoto?: string[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.zoomLevel = parseFloat(data.zoomLevel);
    this.location = data.location;
    this.routePhoto =
      data.routePhoto?.map((e) => new CreateRoutePhotoCommand({ url: e })) ??
      [];
  }
}
