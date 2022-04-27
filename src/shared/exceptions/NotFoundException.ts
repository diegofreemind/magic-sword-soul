import { HTTP_NOT_FOUND_CODE } from '../constants/httpStatusCode';
import HttpException from './HttpException';

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HTTP_NOT_FOUND_CODE, message);
  }
}
