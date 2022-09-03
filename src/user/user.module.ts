import { Module } from '@nestjs/common';
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
  ],
})
export class UserModule {}
