import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CoupleService } from './application/couple.service';
import { UserService } from './application/user.service';
import { CodeService } from './infra/code.service';
import { CoupleRepository } from './infra/prisma/couple.repository';
import { UserRepository } from './infra/prisma/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'CODE_SERVICE', useClass: CodeService },
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
    CoupleService,
    { provide: 'COUPLE_REPOSITORY', useClass: CoupleRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
