import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export default class AwsService {
  s3: S3;
  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env['ACCESS_KEY_ID'],
        secretAccessKey: process.env['SECRET_ACCESS_KEY'],
      },
      region: 'ap-northeast-2',
    });
  }

  private getExtensionString = ({ originalname }: Express.Multer.File) => {
    const splitedFileName = originalname.split('.');

    return `.${splitedFileName[splitedFileName.length - 1]}`;
  };

  private uploadFileToS3 = (
    file: Express.Multer.File,
  ): Promise<S3.ManagedUpload.SendData> => {
    return this.s3
      .upload(
        {
          Bucket: 'today-route-image',
          Key: `route-photos/${new Date().toISOString()}${this.getExtensionString(
            file,
          )}`,
          Body: file.buffer,
        },
        (_err: Error) => {
          throw _err;
        },
      )
      .promise();
  };

  async uploadOne(file: Express.Multer.File): Promise<string> {
    return (await this.uploadFileToS3(file)).Location;
  }

  async uploadMany(photos: Array<Express.Multer.File>): Promise<string[]> {
    const result: Array<S3.ManagedUpload.SendData> = [];

    for (const photo of photos) {
      result.push(await this.uploadFileToS3(photo));
    }

    return result.map((e) => e.Location);
  }
}
