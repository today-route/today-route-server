import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateRouteCommand,
  GetRouteListCommand,
  UpdateRouteCommand,
} from 'src/route/application/command/route.command';

import RouteEntity from 'src/route/domain/entity/route.entity';
import IRouteRepository from 'src/route/domain/repository/route.repository';

@Injectable()
export class RouteRepository implements IRouteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateRouteCommand) {
    return this.prismaService.route.create({
      data: {
        ...data,
        geoCoord: {
          create: data.geoCoord,
        },
        routePhoto: { create: data.routePhoto },
      },
    });
  }

  public async findByCoupleId(arg: GetRouteListCommand) {
    const start = new Date(`${arg.year}-${arg.month}-01`);
    const end = new Date(
      new Date(`${arg.year}-${arg.month}-01`).setMonth(
        new Date(`${arg.year}-${arg.month}-01`).getMonth() + 1,
      ),
    );

    const routeList = await this.prismaService.route.findMany({
      where: {
        AND: [
          { coupleId: arg.coupleId },
          {
            date: {
              gte: start,
              lt: end,
            },
          },
        ],
      },
    });

    return routeList.map(
      (route) =>
        new RouteEntity({
          ...route,
        }),
    );
  }

  public async findMyRouteById(id: number) {
    const result = await this.prismaService.route.findUnique({
      where: { id },
      include: { geoCoord: true, routePhoto: true, couple: true },
    });

    return new RouteEntity({ ...result });
  }

  public async update(arg: UpdateRouteCommand) {
    return (
      await this.prismaService.$transaction([
        this.prismaService.routePhoto.deleteMany({
          where: { routeId: arg.id },
        }),
        this.prismaService.route.update({
          where: { id: arg.id },
          data: {
            zoomLevel: arg.zoomLevel,
            title: arg.title,
            content: arg.content,
            location: arg.location,
            routePhoto: {
              create: arg.routePhoto.map((routePhoto) => ({
                url: routePhoto.url,
              })),
            },
          },
        }),
      ])
    )[1];
  }
}
