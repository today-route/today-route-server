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
import { UserService } from 'src/user/application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dto/user.dto';
import { User } from 'src/utils/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const token = await this.userService.create(createUserDto);
    const user = await this.userService.findByKey(createUserDto.key);

    return { ...token, user };
  }

  @Post('/signin')
  async login(@Body() authDto: { key: string }) {
    const token = await this.userService.signin(authDto.key);
    const user = await this.userService.findByKey(authDto.key);

    return { ...token, user };
  }

  @Post('/refresh')
  refresh(@Body() refreshDto: { refresh: string }) {
    return this.userService.refresh(refreshDto.refresh);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() { id }) {
    return this.userService.findById(id);
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
}
