import { CreateUserDao } from './dao/user.dao';
import UserEntity from '../entity/user.entity';
import { UpdateUserDto } from 'src/user/application/dto/user.dto';

export default interface IUserRepository {
  create(createUserDao: CreateUserDao): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findByKey(key: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByCode(code: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
}
