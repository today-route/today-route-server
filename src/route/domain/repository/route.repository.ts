import {
  CreateRouteCommand,
  GetRouteListCommand,
} from 'src/route/application/command/route.command';

import RouteEntity from '../entity/route.entity';

export default interface IRouteRepository {
  create(createRouteDao: CreateRouteCommand): Promise<any>;
  findByCoupleId(arg: GetRouteListCommand): Promise<RouteEntity[]>;
  findMyRouteById(id: number): Promise<RouteEntity>;
  delete(id: number): Promise<void>;
}
