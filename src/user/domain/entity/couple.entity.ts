import UserEntity from './user.entity';

export default class CoupleEntity {
  constructor(couple: {
    id: number;
    startDate: Date;
    isEnd: boolean;
    boy?: UserEntity;
    girl?: UserEntity;
  }) {
    this.id = couple.id;
    this.startDate = couple.startDate;
    this.isEnd = couple.isEnd;
    this.boy = couple.boy;
    this.girl = couple.girl;
  }

  id: number;
  startDate: Date;
  isEnd: boolean;
  boy?: UserEntity;
  girl?: UserEntity;
}
