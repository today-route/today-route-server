export default class UserEntity {
  constructor(user: {
    id: number;
    key: string;
    email: string;
    nickname: string;
    introduction?: string;
    profileUrl: string;
    createdAt?: Date;
  }) {
    this.id = user.id;
    this.key = user.key;
    this.email = user.email;
    this.nickname = user.nickname;
    this.introduction = user.introduction;
    this.profileUrl = user.profileUrl;
    this.createdAt = user.createdAt;
  }

  id: number;
  key: string;
  email: string;
  nickname: string;
  introduction?: string;
  profileUrl: string;
  createdAt?: Date;
}
