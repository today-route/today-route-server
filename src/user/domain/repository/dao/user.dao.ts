import { Gender } from '../../entity/user.entity';

export type CreateUserDao = {
  email: string;
  key: string;
  code: string;
  gender: Gender;
  nickname: string;
  profileUrl: string;
  birthday: Date;
};

export type UpdateUserDao = {
  nickname?: string;
  profileUrl?: string;
};
