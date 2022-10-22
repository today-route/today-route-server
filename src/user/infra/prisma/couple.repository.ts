import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CoupleEntity from 'src/user/domain/entity/couple.entity';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';
import ICoupleRepository from 'src/user/domain/repository/couple.repository';
import UserEntity from 'src/user/domain/entity/user.entity';

@Injectable()
export class CoupleRepository implements ICoupleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createCoupleDao: CreateCoupleDao): Promise<CoupleEntity> {
    const couple = await this.prismaService.couple.create({
      data: {
        startDate: new Date(createCoupleDao.startDate),
        isEnd: false,
        boy: { connect: { id: createCoupleDao.boyId } },
        girl: { connect: { id: createCoupleDao.girlId } },
      },
    });

    return new CoupleEntity({ ...couple });
  }

  public async findByUserId(id: number) {
    const couple = await this.prismaService.couple.findFirst({
      where: {
        OR: [{ boyId: id }, { girlId: id }],
        AND: [{ isEnd: false }],
      },
      include: {
        boy: true,
        girl: true,
      },
    });

    if (couple === null) return null;

    return new CoupleEntity({
      ...couple,
      boy: new UserEntity(couple.boy),
      girl: new UserEntity(couple.girl),
    });
  }
}
