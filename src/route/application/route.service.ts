import { Inject, Injectable } from '@nestjs/common';
import { RouteRepository } from '../infra/prisma/route.repository';
import { CreateRouteCommand } from './command/route.command';

@Injectable()
export class RouteService {
  constructor(
    @Inject('ROUTE_REPOSITORY')
    private readonly routeRepository: RouteRepository,
  ) {}

  create(createRouteDto: CreateRouteCommand) {
    this.routeRepository.create({
      ...createRouteDto,
    });
  }
}
