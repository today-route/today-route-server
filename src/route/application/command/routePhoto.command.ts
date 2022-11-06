export class CreateRoutePhotoCommand {
  url: string;

  constructor(data: { url: string }) {
    this.url = data.url;
  }
}
