/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createMock } from '@golevelup/ts-jest';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

// import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { CatchMaliciousInput } from './catch-malicious-input.middleware';

describe('CatchMaliciousInput', () => {
  //* Modified
  //   let appConfigService: AppConfigService;
  /*const appConfigService = {
    maxBodySize: 10,
  };*/
  const appConfigService = createMock<AppConfigService>({
    get maxBodySize() {
      return 10;
    },
  });
  let middleware: CatchMaliciousInput;

  beforeEach(async () => {
    //~ In order to get a valid module reference needs to call compile fn
    const moduleRef = await Test.createTestingModule({
      //~ By doing this NestJS will load all depencencies for AppConfigService
      //* Removed
      //   imports: [AppConfigModule],
      providers: [
        CatchMaliciousInput,
        //* Added
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
      ],
    }).compile();

    //* Removed
    // appConfigService = moduleRef.get<AppConfigService>(AppConfigService);
    middleware = moduleRef.get<CatchMaliciousInput>(CatchMaliciousInput);

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    describe('when body is too large', () => {
      let response: MockResponse<any>;
      let request: MockRequest<any>;
      let next: jest.Mock;

      beforeEach(() => {
        //~ Arrange
        //* Removed
        // jest.spyOn(appConfigService, 'maxBodySize', 'get').mockReturnValue(10);

        request = createRequest({
          body: { description: 'a', name: 'test' },
          method: 'POST',
        });
        response = createResponse();
        next = jest.fn();

        //~ Act
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        middleware.use(request, response, next);
      });

      it('should set response status code to "BAD_REQUEST"', () => {
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('should set response data object', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        expect(response._getData()).toEqual({
          message: 'Request body exceeds size limit',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });

      it('should not call the next middleware', () => {
        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});
