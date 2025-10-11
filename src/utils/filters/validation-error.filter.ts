import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from '../exceptions/validation-error';

//~ We just want to catch ValidationError
@Catch(ValidationError)
// export class ValidationErrorFilter<T> implements ExceptionFilter {
export class ValidationErrorFilter implements ExceptionFilter {
  //   catch(exception: T, host: ArgumentsHost) {}
  catch(exception: ValidationError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // response.status(400)
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
