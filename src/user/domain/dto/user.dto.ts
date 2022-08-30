export type CreateUserDto = {
  email: string;
  key: string;
  gender: string;
  nickname: string;
  profileUrl: string;
  birthday: string;
};

export type UpdateUserDto = {
  nickname?: string;
  profileUrl?: string;
};
