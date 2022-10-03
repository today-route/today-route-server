import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import AuthService from 'src/auth/auth.service';
import TokenDto from '../domain/dto/token.dto';
import { CreateUserDto, UpdateUserDto } from '../domain/dto/user.dto';
import UserEntity from '../domain/entity/user.entity';
import IUserRepository from '../domain/repository/user.repository';
import ICodeService from './code.service';

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

    return this.authService.login(user.id);
  }

  async login(key: string): Promise<TokenDto> {
    const user = await this.userRepository.findByKey(key);

    if (user === null) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }

    return this.authService.login(user.id);
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

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(email, updateUserDto);
  }
}
