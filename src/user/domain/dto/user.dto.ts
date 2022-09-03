import { Gender } from '../entity/user.entity';

export type CreateUserDto = {
  key: string;
  email: string;
  gender: Gender;
  nickname: string;
  profileUrl: string;
  birthday: string;
};

export type UpdateUserDto = {
  nickname?: string;
  profileUrl?: string;
};
