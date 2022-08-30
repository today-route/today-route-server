export type CreateUserDao = {
  email: string;
  key: string;
  code: string;
  gender: string;
  nickname: string;
  profileUrl: string;
  birthday: string;
};

export type UpdateUserDao = {
  nickname?: string;
  profileUrl?: string;
};
