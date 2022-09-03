import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../domain/dto/user.dto';
import UserEntity from '../domain/entity/user.entity';
import IUserRepository from '../domain/repository/user.repository';
import ICodeService from './code.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: IUserRepository,
    @Inject('CODE_SERVICE') private codeService: ICodeService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const code = this.codeService.createCode();

    return await this.userRepository.create({
      ...createUserDto,
      birthday: new Date(createUserDto.birthday),
      code,
    });
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
