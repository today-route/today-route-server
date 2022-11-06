import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AwsModule } from 'src/aws/aws.module';
import { RouteController } from 'src/route/interface/route.controller';
import { RouteService } from 'src/route/application/route.service';
import { RouteRepository } from './infra/prisma/route.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, AwsModule, AuthModule],
  controllers: [RouteController],
  providers: [
    RouteService,
    { provide: 'ROUTE_REPOSITORY', useClass: RouteRepository },
  ],
})
export class RouteModule {}
