import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDao } from '../../domain/repository/dao/user.dao';
import UserEntity from '../../domain/entity/user.entity';
import IUserRepository from '../../domain/repository/user.repository';
import { UpdateUserDto } from 'src/user/application/dto/user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDao: CreateUserDao) {
    const user = await this.prismaService.user.create({
      data: createUserDao,
    });
    return new UserEntity({ ...user });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    if (user == null) return null;

    return new UserEntity(user);
  }

  public async findByKey(key: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({ where: { key } });

    if (user == null) return null;

    return new UserEntity(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (user === null) return null;

    return new UserEntity(user);
  }

  public async findByCode(code: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where: { code },
    });

    if (user === null) return null;

    return new UserEntity(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    const userList = await this.prismaService.user.findMany();
    return userList.map((user) => new UserEntity(user));
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return new UserEntity(user);
  }

  public async delete(id: number) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
