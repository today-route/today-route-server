import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CreateUserDao } from '../domain/dao/user.dao';
import { CreateUserDto, UpdateUserDto } from '../domain/dto/user.dto';

import UserEntity from '../domain/entity/user.entity';
import { CodeService } from '../infra/code.service';
import { UserRepository } from '../infra/prisma/user.repository';
import { UserService } from './user.service';

describe('test user service', () => {
  let repository: UserRepository;
  let userService: UserService;
  let codeService: CodeService;

  const userData: UserEntity = {
    id: 1,
    key: 'key',
    code: '123456',
    email: 'test@gmail.com',
    gender: 'M',
    nickname: 'test',
    profileUrl: 'image link',
    birthday: new Date(),
    createdAt: new Date(),
    deletedAt: null,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // Test 대상 객체를 제외하고 전부 Mock 객체 사용
        UserService,
        { provide: PrismaService, useValue: { user: jest.fn() } },
        { provide: 'USER_REPOSITORY', useValue: { create: jest.fn() } },
        CodeService,
      ],
    }).compile();

    repository = module.get('USER_REPOSITORY');
    userService = module.get<UserService>(UserService);
    codeService = module.get<CodeService>(CodeService);
  });

  it('create user', async () => {
    // Given
    const userDto: CreateUserDto = {
      ...userData,
      birthday: '2000-01-01',
    };

    const code = codeService.createCode();

    repository.create = jest.fn((createUserDao: CreateUserDao) =>
      Promise.resolve(new UserEntity({ ...createUserDao, id: 1, code })),
    );

    // When
    const userEntity = await userService.create(userDto);

    // Then

    expect(userEntity.email).toBe(userDto.email);
    expect(userEntity.nickname).toBe(userDto.nickname);
    expect(userEntity.profileUrl).toBe(userDto.profileUrl);
  });

  it('find user by id', async () => {
    // Given
    const id = 1;

    repository.findById = jest.fn((id: number) => {
      return Promise.resolve(
        new UserEntity({
          ...userData,
          id,
        }),
      );
    });

    // When
    const user = await userService.findById(id);

    // Then
    expect(user.id).toBe(id);
    expect(repository.findById).toBeCalledTimes(1);
  });

  it('find user by email', async () => {
    // Given
    const email = userData.email;

    repository.findByEmail = jest.fn((email: string) => {
      return Promise.resolve(
        new UserEntity({
          ...userData,
          email,
        }),
      );
    });

    // When
    const user = await userService.findByEmail(email);

    // Then
    expect(user.email).toBe(email);
    expect(repository.findByEmail).toBeCalledTimes(1);
  });
});
