import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto, UpdateUserDto } from '../domain/dto/user.dto';

import UserEntity from '../domain/entity/user.entity';
import { UserRepository } from '../infra/prisma/user.repository';
import { UserService } from './user.service';

describe('test user service', () => {
  let repository: UserRepository;
  let service: UserService;

  const userData: UserEntity = {
    id: 1,
    key: 'key',
    email: 'test@gmail.com',
    nickname: 'test',
    introduction: 'hello',
    profileUrl: 'image link',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // Test 대상 객체를 제외하고 전부 Mock 객체 사용
        UserService,
        { provide: PrismaService, useValue: { user: jest.fn() } },
        { provide: 'USER_REPOSITORY', useValue: { create: jest.fn() } },
      ],
    }).compile();

    repository = module.get('USER_REPOSITORY');
    service = module.get<UserService>(UserService);
  });

  it('create user', async () => {
    // Given
    const userDto: CreateUserDto = {
      ...userData,
    };

    repository.create = jest.fn(() =>
      Promise.resolve(new UserEntity({ id: 1, ...userDto })),
    );

    // When
    const userEntity = await service.create(userDto);

    // Then

    expect(userEntity.email).toBe(userDto.email);
    expect(userEntity.nickname).toBe(userDto.nickname);
    expect(userEntity.profileUrl).toBe(userDto.profileUrl);
    expect(userEntity.introduction).toBe(userDto.introduction);
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
    const user = await service.findById(id);

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
    const user = await service.findByEmail(email);

    // Then
    expect(user.email).toBe(email);
    expect(repository.findByEmail).toBeCalledTimes(1);
  });
});
