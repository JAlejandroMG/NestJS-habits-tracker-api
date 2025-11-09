import { NextFunction, Request, Response } from 'express';
import { hasExceededMaxSize } from './has-exceeded-max-size';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { hasSuspiciousPatterns } from './has-suspicious-patterns';
import { AppConfigService } from 'src/app-config/app-config.service';

//* Modified
// export const catchMaliciousInput =
//   (maxBodySize: number) =>
//~ To make sure this class will be managed by NestJS
@Injectable()
export class CatchMaliciousInput implements NestMiddleware {
  constructor(private readonly appConfigService: AppConfigService) {}

  use(
    req: Request,
    //~ With this Response object can be terminated the Request cycle
    //~ by using the Reponse object, and sending the response to the API client
    //~ so the control doesn't have to be released over the next middleware in the chain
    res: Response,
    next: NextFunction,
    //*Modified
    //   ) => {
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = req;

    //* Modified
    // if (hasExceededMaxSize(body, maxBodySize)) {
    if (hasExceededMaxSize(body, this.appConfigService.maxBodySize)) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Request body exceeds size limit',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (hasSuspiciousPatterns(body)) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Invalid input',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    //~ This sill release control over the next middleware in the chain
    //~ If this is not called the Request will just hang
    //~ and the API client will never receive a Response
    next();
  }
}
