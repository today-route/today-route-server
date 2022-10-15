export default class UserEntity {
  constructor(user: {
    id: number;
    key: string;
    code: string;
    email: string;
    gender: Gender;
    nickname: string;
    profileUrl: string;
    birthday: Date;
    createdAt?: Date;
    deletedAt?: Date;
  }) {
    this.id = user.id;
    this.key = user.key;
    this.code = user.code;
    this.email = user.email;
    this.gender = user.gender;
    this.nickname = user.nickname;
    this.profileUrl = user.profileUrl;
    this.birthday = user.birthday;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
  }

  id: number;
  key: string;
  code: string;
  email: string;
  gender: Gender;
  nickname: string;
  profileUrl: string;
  birthday: Date;
  createdAt?: Date;
  deletedAt?: Date;

  get isMale(): boolean {
    return this.gender === 'M';
  }
}

export type Gender = 'M' | 'F';
