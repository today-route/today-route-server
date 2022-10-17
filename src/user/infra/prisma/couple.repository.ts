import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CoupleEntity from 'src/user/domain/entity/couple.entity';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';
import ICoupleRepository from 'src/user/domain/repository/couple.repository';

@Injectable()
export class CoupleRepository implements ICoupleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createCoupleDao: CreateCoupleDao) {
    const couple = await this.prismaService.couple.create({
      data: {
        startDate: new Date(createCoupleDao.startDate),
        isEnd: false,
        User_Couple_boyToUser: { connect: { id: createCoupleDao.boyId } },
        User_Couple_girlToUser: { connect: { id: createCoupleDao.girlId } },
      },
    });

    return new CoupleEntity({ ...couple });
  }

  public async findByUserId(id: number) {
    const couple = await this.prismaService.couple.findFirst({
      where: {
        OR: [
          { User_Couple_boyToUser: { id } },
          { User_Couple_girlToUser: { id } },
        ],
        AND: [{ isEnd: false }],
      },
    });

    if (couple === null) return null;

    return new CoupleEntity({ ...couple });
  }
}
