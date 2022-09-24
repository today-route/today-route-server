import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './application/user.service';
import { CodeService } from './infra/code.service';
import { UserRepository } from './infra/prisma/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'CODE_SERVICE', useClass: CodeService },
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
  ],
})
export class UserModule {}
