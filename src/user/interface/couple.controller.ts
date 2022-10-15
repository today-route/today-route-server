import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';
import { CoupleService } from '../application/couple.service';
import { UserService } from '../application/user.service';

@UseGuards(AuthGuard)
@Controller('couple')
export class CoupleController {
  constructor(
    private readonly userService: UserService,
    private readonly coupleService: CoupleService,
  ) {}

  @Get()
  getCoupleData(@User() user) {
    return this.coupleService.findByUserId(user.id);
  }

  @UseGuards(AuthGuard)
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
}
