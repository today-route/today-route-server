import { CreateRouteCommand } from 'src/route/application/command/route.command';

import RouteEntity from '../entity/route.entity';

export default interface IRouteRepository {
  create(createRouteDao: CreateRouteCommand): Promise<any>;
  findByCoupleId(coupleId: number): Promise<RouteEntity[]>;
}
