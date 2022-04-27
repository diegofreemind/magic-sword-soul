import { HTTP_BAD_REQUEST_CODE } from '../constants/httpStatusCode';
import HttpException from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HTTP_BAD_REQUEST_CODE, message);
  }
}
