import { NextFunction, Request, Response } from 'express';
import { HTTP_SUCCESS_CODE } from '../../shared/constants/httpStatusCode';
import ListCharacterUseCase from '../../useCases/ListCharacter/ListCharacterUseCase';

export default class ListCharacterController {
  constructor(private listCharacterUseCase: ListCharacterUseCase) {}
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { query } = request;
      const { pageNumber, pageSize } = query;

      const parsedLimitSize = {
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
      };

      const props = (({ pageSize, pageNumber, ...params }) => params)(query);
      const pagination = pageNumber && pageSize ? parsedLimitSize : undefined;

      const characters = await this.listCharacterUseCase.execute(
        props,
        pagination
      );

      return response.status(HTTP_SUCCESS_CODE).send(characters);
    } catch (error: any) {
      next(error);
    }
  }
}
