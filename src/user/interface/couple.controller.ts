import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';
import { CoupleService } from '../application/couple.service';
import { UserService } from '../application/user.service';
import CoupleEntity from '../domain/entity/couple.entity';
import { UpdateCoupleRequest } from './couple.request';

@UseGuards(AuthGuard)
@Controller('couple')
export class CoupleController {
  constructor(
    private readonly userService: UserService,
    private readonly coupleService: CoupleService,
  ) {}

  @Get()
  getCouple(@User() user) {
    return this.coupleService.findByUserId(user.id);
  }

  @Post()
  async createCouple(
    @User() user,
    @Body() createCoupleDto: { code: string; startDate: string },
  ): Promise<void> {
    const partner = await this.userService.findByCode(createCoupleDto.code);

    if (partner.gender === 'M') {
      this.coupleService.create({
        startDate: createCoupleDto.startDate,
        boyId: partner.id,
        girlId: user.id,
      });
    } else {
      this.coupleService.create({
        startDate: createCoupleDto.startDate,
        boyId: user.id,
        girlId: partner.id,
      });
    }
  }

  @Patch()
  async updateCouple(
    @User() user,
    @Body() updateCoupleDto: UpdateCoupleRequest,
  ) {
    const couple: CoupleEntity = await this.coupleService.findByUserId(user.id);

    return this.coupleService.update(couple.id, updateCoupleDto);
  }
}
