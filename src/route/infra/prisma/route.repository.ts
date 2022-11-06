import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteCommand } from 'src/route/application/command/route.command';
import GeoCoordEntity from 'src/route/domain/entity/geoCoord.entity';
import RouteEntity from 'src/route/domain/entity/route.entity';
import RoutePhotoEntity from 'src/route/domain/entity/routePhoto.entity';
import IRouteRepository from 'src/route/domain/repository/route.repository';

@Injectable()
export class RouteRepository implements IRouteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateRouteCommand) {
    const createRouteOperation = this.prismaService.route.create({
      data: {
        ...data,
        geoCoord: {
          create: data.geoCoord,
        },
        routePhoto: { create: data.routePhoto },
      },
    });

    const route = await this.prismaService.$transaction([createRouteOperation]);
    console.log('create route result');
    console.dir(route);

    // return new RouteEntity(route);
  }

  public async findByCoupleId(coupleId: number) {
    const routeList = await this.prismaService.route.findMany({
      where: { coupleId },
      include: { geoCoord: true, routePhoto: true },
    });

    console.dir(routeList);

    return routeList.map(
      (route) =>
        new RouteEntity({
          ...route,
          geoCoord: route.geoCoord.map(
            (geoCoord) => new GeoCoordEntity(geoCoord),
          ),
          routePhoto: route.routePhoto.map(
            (routePhoto) => new RoutePhotoEntity(routePhoto),
          ),
        }),
    );
  }
}
