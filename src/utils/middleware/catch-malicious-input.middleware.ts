import { NextFunction, Request, Response } from 'express';
import { hasExceededMaxSize } from './has-exceeded-max-size';
import { HttpStatus } from '@nestjs/common';
import { hasSuspiciousPatterns } from './has-suspicious-patterns';

export const catchMaliciousInput = (
  req: Request,
  //~ With this Response object can be terminated the Request cycle
  //~ by using the Reponse object, and sending the response to the API client
  //~ so the control doesn't have to be released over the next middleware in the chain
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { body } = req;
  //   console.log('Body\n', body);
  const maxBodySize = 1024 * 1024; //+ 1MB
  //   const maxBodySize = 1; //+ 1byte for testing

  if (hasExceededMaxSize(body, maxBodySize)) {
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
};
