import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../domain/dto/user.dto';
import { PrismaService } from '../../../prisma.service';
import UserEntity from '../../domain/entity/user.entity';
import IUserRepository from '../../domain/repository/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({ data: createUserDto });

    return new UserEntity(user);
  }

  public async findById(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    return new UserEntity(user);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    return new UserEntity(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany();
  }

  public async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { email },
      data: updateUserDto,
    });

    return new UserEntity(user);
  }
}
