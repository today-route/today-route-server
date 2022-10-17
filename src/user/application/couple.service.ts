import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findByUserId(id: number) {
    const couple = await this.coupleRepository.findByUserId(id);

    if (couple === null)
      throw new NotFoundException('현재 연결된 상대가 없습니다.');

    return couple;
  }
}
