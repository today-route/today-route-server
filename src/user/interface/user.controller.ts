import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';
import { CoupleService } from 'src/user/application/couple.service';
import { UserService } from 'src/user/application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly coupleService: CoupleService,
  ) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() authDto: { key: string }) {
    return this.userService.login(authDto.key);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);

    if (user === null) throw new NotFoundException();
    return user;
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('/couple')
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
