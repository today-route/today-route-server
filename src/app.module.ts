import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthGuard } from './auth/auth.guard';
import { AwsModule } from './aws/aws.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
    }),
    AwsModule,
    RouteModule,
  ],
  controllers: [],
  providers: [PrismaService, AuthGuard],
  exports: [],
})
export class AppModule {}
