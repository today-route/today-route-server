import { Module } from '@nestjs/common';
import AuthService from 'src/auth/auth.service';
import { PrismaService } from '../prisma.service';
import { UserService } from './application/user.service';
import { CodeService } from './infra/code.service';
import { UserRepository } from './infra/prisma/user.repository';
import { UserController } from './interface/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    { provide: 'CODE_SERVICE', useClass: CodeService },
    { provide: 'USER_REPOSITORY', useClass: UserRepository },
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
})
export class UserModule {}
