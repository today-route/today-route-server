import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import ICodeService from '../application/code.service';

@Injectable()
export class CodeService implements ICodeService {
  public createCode() {
    return customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
  }
}
