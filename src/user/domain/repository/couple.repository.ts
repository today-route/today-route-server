import CoupleEntity from '../entity/couple.entity';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';

export default interface ICoupleRepository {
  create(createCoupleDao: CreateCoupleDao): Promise<CoupleEntity>;
  findByUserId(id: number): Promise<CoupleEntity | null>;
}
