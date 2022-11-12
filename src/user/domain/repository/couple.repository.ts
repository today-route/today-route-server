import CoupleEntity from '../entity/couple.entity';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';

export default interface ICoupleRepository {
  create(createCoupleDao: CreateCoupleDao): Promise<CoupleEntity>;
  findById(id: number): Promise<CoupleEntity | null>;
  findByUserId(userId: number): Promise<CoupleEntity | null>;
  update(id: number, updateUserDao): Promise<CoupleEntity>;
}
