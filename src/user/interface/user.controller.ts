import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const token = await this.userService.create(createUserDto);
    const user = await this.userService.findByKey(createUserDto.key);

    return { ...token, user };
  }

  @Post('/login')
  async login(@Body() authDto: { key: string }) {
    const token = await this.userService.login(authDto.key);
    const user = await this.userService.findByKey(authDto.key);

    return { ...token, user };
  }

  @Post('/refresh')
  refresh(@Body() refreshDto: { refresh: string }) {
    return this.userService.refresh(refreshDto.refresh);
  }

  @Get('/')
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
}
