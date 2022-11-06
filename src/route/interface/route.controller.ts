import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import AwsService from 'src/aws/aws.service';
import { CoupleService } from 'src/user/application/couple.service';
import { User } from 'src/utils/user.decorator';
import { RouteService } from 'src/route/application/route.service';
import { CreateRouteRequest } from 'src/route/interface/route.request';
import { CreateRouteCommand } from '../application/command/route.command';

// @UseGuards(AuthGuard)
@Controller('route')
export class RouteController {
  constructor(
    private readonly awsService: AwsService,
    private readonly coupleService: CoupleService,
    private readonly routeService: RouteService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async createRoute(
    @User() userInfo: { id: number; coupleId?: number },
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() body: CreateRouteRequest,
  ) {
    const couple = await this.coupleService.findByUserId(userInfo.id);
    const photoUrlList = await this.awsService.upload(photos);

    if (photoUrlList.length !== photos.length) {
      throw new BadRequestException('사진 등록에 문제가 발생했습니다.');
    }

    this.routeService.create(
      new CreateRouteCommand({
        ...body,
        coupleId: couple.id,
        routePhoto: photoUrlList,
      }),
    );
  }
}
