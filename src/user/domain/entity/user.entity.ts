export default class UserEntity {
  constructor(user: {
    id: number;
    email: string;
    key: string;
    nickname: string;
    profileUrl: string;
    birthday: Date;
    code: string;
    createdAt?: Date;
    deletedAt?: Date;
  }) {
    this.id = user.id;
    this.key = user.key;
    this.email = user.email;
    this.nickname = user.nickname;
    this.profileUrl = user.profileUrl;
    this.birthday = user.birthday;
    this.code = user.code;
    this.createdAt = user.createdAt;
    this.deletedAt = user.deletedAt;
  }

  id: number;
  key: string;
  email: string;
  nickname: string;
  profileUrl: string;
  birthday: Date;
  code: string;
  createdAt?: Date;
  deletedAt?: Date;
}
