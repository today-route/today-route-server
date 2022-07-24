import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import UserEntity from '../entity/user.entity';

export default interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(email: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
}
