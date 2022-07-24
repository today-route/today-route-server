export type CreateUserDto = {
  key: string;
  email: string;
  nickname: string;
  introduction?: string;
  profileUrl: string;
};

export type UpdateUserDto = {
  email?: string;
  nickname?: string;
  introduction?: string;
  profileUrl?: string;
};
