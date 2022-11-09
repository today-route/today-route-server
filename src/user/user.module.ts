import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AwsModule } from 'src/aws/aws.module';
import { CoupleService } from 'src/user/application/couple.service';
import { UserService } from 'src/user/application/user.service';
import { CodeService } from 'src/user/infra/code.service';
import { CoupleRepository } from 'src/user/infra/prisma/couple.repository';
import { UserRepository } from 'src/user/infra/prisma/user.repository';
import { CoupleController } from 'src/user/interface/couple.controller';
import { UserController } from 'src/user/interface/user.controller';

@Module({
  imports: [AuthModule, AwsModule],
  controllers: [UserController, CoupleController],
  providers: [
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
    { provide: 'COUPLE_REPOSITORY', useClass: CoupleRepository },
    UserService,
    CoupleService,
    { provide: 'CODE_SERVICE', useClass: CodeService },
  ],
  exports: [UserService, CoupleService],
})
export class UserModule {}
