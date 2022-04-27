import { HTTP_UNPROCESSABLE_ENTITY_CODE } from '../constants/httpStatusCode';
import HttpException from './HttpException';

export class UnprocessableException extends HttpException {
  constructor(message: string) {
    super(HTTP_UNPROCESSABLE_ENTITY_CODE, message);
  }
}
