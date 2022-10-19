import { Inject, Injectable } from '@nestjs/common';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';
import ICoupleRepository from 'src/user/domain/repository/couple.repository';

@Injectable()
export class CoupleService {
  constructor(
    @Inject('COUPLE_REPOSITORY')
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  create(createCoupleDao: CreateCoupleDao) {
    return this.coupleRepository.create(createCoupleDao);
  }

  findByUserId(userId: number) {
    return this.coupleRepository.findByUserId(userId);
  }
}
