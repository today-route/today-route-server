import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import {
  CreateRouteRequest,
  UpdateRouteRequest,
} from 'src/route/interface/route.request';
import {
  CreateRouteCommand,
  GetRouteListCommand,
  UpdateRouteCommand,
} from '../application/command/route.command';
import RouteDto from '../domain/dto/route.dto';
import CoupleEntity from 'src/user/domain/entity/couple.entity';

@UseGuards(AuthGuard)
@Controller('route')
export class RouteController {
  constructor(
    private readonly awsService: AwsService,
    private readonly coupleService: CoupleService,
    private readonly routeService: RouteService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async createRoute(
    @User() userInfo: { id: number; coupleId?: number },
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() body: CreateRouteRequest,
  ) {
    const couple = await this.coupleService.findByUserId(userInfo.id);
    const photoUrlList = await this.awsService.uploadMany(photos);

    if (photoUrlList.length !== photos.length) {
      throw new BadRequestException('사진 등록에 문제가 발생했습니다.');
    }

    const route = await this.routeService.create(
      new CreateRouteCommand({
        ...body,
        coupleId: couple.id,
        routePhoto: photoUrlList,
      }),
    );

    return { id: route.id };
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('photos'))
  async updateRoute(
    @User() userInfo: { id: number },
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Body() body: UpdateRouteRequest,
  ) {
    const couple: CoupleEntity | null = await this.coupleService.findByUserId(
      userInfo.id,
    );

    if (couple === null) {
      throw new ForbiddenException();
    }

    if (photos.length === 0) {
      return this.routeService.update(
        new UpdateRouteCommand({ ...body, id: parseInt(body.id) }),
      );
    }

    const photoUrlList = await this.awsService.uploadMany(photos);
    console.dir(photoUrlList);
    return this.routeService.update(
      new UpdateRouteCommand({
        ...body,
        id: parseInt(body.id),
        routePhoto: photoUrlList,
      }),
    );
  }

  @Get()
  async getRouteWithMonth(
    @User() userInfo: { id: number; coupleId?: number },
    @Query() date: { year: string; month: string },
  ) {
    const couple = await this.coupleService.findByUserId(userInfo.id);

    const x = await this.routeService.getMonthly(
      new GetRouteListCommand({ ...date, coupleId: couple.id }),
    );

    return x.map((e) => new RouteDto(e));
  }

  @Get(':id')
  async getRouteDetail(
    @User() userInfo: { id: number; coupleId?: number },
    @Param('id') id: number,
  ) {
    const couple = await this.coupleService.findByUserId(userInfo.id);

    const route = await this.routeService.getDetail(id);

    if (route.couple.id === couple.id) {
      return new RouteDto(route);
    }

    throw new ForbiddenException('본인의 루트가 아닙니다');
  }
}
