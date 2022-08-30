import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../domain/dto/user.dto';
import UserEntity from '../domain/entity/user.entity';
import IUserRepository from '../domain/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const code = 'abcd';

    const user = await this.userRepository.create({ ...createUserDto, code });
    return new UserEntity(user);
  }

  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(email, updateUserDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
