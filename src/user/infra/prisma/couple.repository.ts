import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CoupleEntity from 'src/user/domain/entity/couple.entity';
import { CreateCoupleDao } from 'src/user/domain/repository/dao/couple.dao';
import ICoupleRepository from 'src/user/domain/repository/couple.repository';
import UserEntity from 'src/user/domain/entity/user.entity';
import { UpdateCoupleDto } from 'src/user/application/dto/couple.dto';

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

  public async findById(id: number) {
    const couple = await this.prismaService.couple.findFirst({
      where: {
        id,
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

  public async findByUserId(userId: number) {
    const couple = await this.prismaService.couple.findFirst({
      where: {
        OR: [{ boyId: userId }, { girlId: userId }],
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

  public async update(id: number, updateCoupleDto: UpdateCoupleDto) {
    console.dir(updateCoupleDto);
    const updatedData = await this.prismaService.couple.update({
      where: { id },
      data: {
        ...updateCoupleDto,
        startDate:
          updateCoupleDto.startDate === undefined
            ? undefined
            : new Date(updateCoupleDto.startDate),
      },
    });

    return new CoupleEntity({
      ...updatedData,
    });
  }
}
