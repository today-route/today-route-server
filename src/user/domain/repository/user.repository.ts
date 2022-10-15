import { CreateUserDao, UpdateUserDao } from './dao/user.dao';
import UserEntity from '../entity/user.entity';

export default interface IUserRepository {
  create(createUserDao: CreateUserDao): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findByKey(key: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByCode(code: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(email: string, updateUserDao: UpdateUserDao): Promise<UserEntity>;
}
