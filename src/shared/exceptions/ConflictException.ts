import { HTTP_CONFLICT_CODE } from '../constants/httpStatusCode';
import HttpException from './HttpException';

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(HTTP_CONFLICT_CODE, message);
  }
}
