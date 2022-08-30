import { CreateUserDao, UpdateUserDao } from '../dao/user.dao';
import UserEntity from '../entity/user.entity';

export default interface IUserRepository {
  create(createUserDao: CreateUserDao): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(email: string, updateUserDao: UpdateUserDao): Promise<UserEntity>;
}
