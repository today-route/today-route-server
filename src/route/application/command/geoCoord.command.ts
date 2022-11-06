export class CreateGeoCoordCommand {
  latitude: number;
  longitude: number;

  constructor(data: { latitude: string; longitude: string }) {
    this.latitude = parseFloat(data.latitude);
    this.longitude = parseFloat(data.longitude);
  }
}
