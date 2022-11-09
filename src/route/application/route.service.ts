import { Inject, Injectable } from '@nestjs/common';
import { RouteRepository } from '../infra/prisma/route.repository';
import {
  CreateRouteCommand,
  GetRouteListCommand,
} from './command/route.command';

@Injectable()
export class RouteService {
  constructor(
    @Inject('ROUTE_REPOSITORY')
    private readonly routeRepository: RouteRepository,
  ) {}

  create(arg: CreateRouteCommand) {
    return this.routeRepository.create({
      ...arg,
    });
  }

  getMonthly(arg: GetRouteListCommand) {
    return this.routeRepository.findByCoupleId(arg);
  }

  getDetail(id: number) {
    return this.routeRepository.findMyRouteById(id);
  }
}
