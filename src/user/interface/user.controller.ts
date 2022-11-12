import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/user/application/dto/user.dto';
import { User } from 'src/utils/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import AwsService from 'src/aws/aws.service';
import { UpdateUserRequest } from './user.request';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly awsService: AwsService,
    private readonly userService: UserService,
  ) {}

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
  my(@User() { id }) {
    return this.userService.findById(id);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Patch()
  @UseInterceptors(FileInterceptor('profile'))
  async update(
    @User() user: { id: number },
    @UploadedFile() profile: Express.Multer.File,
    @Body() updateUserRequest: UpdateUserRequest,
  ) {
    console.dir(updateUserRequest);
    if (profile) {
      const profileUrl = await this.awsService.uploadOne(profile);

      return this.userService.update(
        user.id,
        new UpdateUserDto({ ...updateUserRequest, profileUrl }),
      );
    }
    return this.userService.update(
      user.id,
      new UpdateUserDto(updateUserRequest),
    );
  }
}
