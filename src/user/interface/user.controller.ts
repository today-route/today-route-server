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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() authDto: { key: string }) {
    return this.userService.login(authDto.key);
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
