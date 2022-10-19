import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from 'src/auth/auth.service';
import TokenDto from 'src/user/application/dto/token.dto';

import UserEntity from 'src/user/domain/entity/user.entity';
import IUserRepository from 'src/user/domain/repository/user.repository';
import ICodeService from 'src/user/application/code.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: IUserRepository,
    @Inject('CODE_SERVICE') private codeService: ICodeService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<TokenDto> {
    const code = this.codeService.createCode();

    const user = await this.userRepository.create({
      ...createUserDto,
      birthday: new Date(createUserDto.birthday),
      code,
    });

    return this.authService.signin(user.id);
  }

  async signin(key: string): Promise<TokenDto> {
    const user = await this.userRepository.findByKey(key);

    if (user === null) {
      throw new UnauthorizedException('존재하지 않는 회원입니다.');
    }

    return this.authService.signin(user.id);
  }

  async refresh(refresh: string): Promise<TokenDto> {
    return this.authService.signin(this.authService.verify(refresh).id);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }

  async findByKey(key: string): Promise<UserEntity | null> {
    return await this.userRepository.findByKey(key);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findByCode(code: string): Promise<UserEntity | null> {
    return await this.userRepository.findByCode(code);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(email, updateUserDto);
  }
}
