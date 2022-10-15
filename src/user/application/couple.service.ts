import { Inject, Injectable } from '@nestjs/common';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';
import ICoupleRepository from 'src/user/domain/repository/couple.repository';

@Injectable()
export class CoupleService {
  constructor(
    @Inject('COUPLE_REPOSITORY')
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async create(createCoupleDao: CreateCoupleDao) {
    this.coupleRepository.create(createCoupleDao);
  }

  async findByUserId(id: number) {
    return await this.coupleRepository.findByUserId(id);
  }
}
