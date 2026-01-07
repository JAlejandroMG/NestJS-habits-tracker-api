/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//~ This library to send request to the application
import * as request from 'supertest';
import { App } from 'supertest/types';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { HabitsModule } from '../src/habits/habits.module';
import { DbType } from '../src/utils/constants';
import { CoreModule } from '../src/core/core.module';

describe('HabitsController', () => {
  //~ We don't want our module to get access to providers,
  //~ we want to generate an entire application,
  //~ and we want to send request to that application
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        //~ Habits module rely on this global module
        //~ that are defined inside app module,
        //~ thus, they should be included in order to
        //~ run the tests properly
        CoreModule.forRoot({
          dbTypes: [DbType.IN_MEMORY],
        }),
        HabitsModule.register({
          dbType: DbType.IN_MEMORY,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    //~ We need to initialize the app
    await app.init();
  });

  afterAll(async () => {
    //~ We need to clean up all tasks at the end
    await app.close();
  });

  //~ findAll
  describe('GET /habits', () => {
    it('should return an array of habits', () => {
      //~ app.getHttpServer is the utility that allow us
      //~ to pass the server that the supertest library
      //~ is going to work with
      return request(app.getHttpServer())
        .get('/habits')
        .expect(200)
        .expect((res) => {
          //   console.log('res', res.body);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body.length).toBe(4);
        });
    });

    it('should return one habit when the "limit" query parameter is set to 1', () => {
      return request(app.getHttpServer())
        .get('/habits?limit=1')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it('should return a sorted array of habits when the "sortBy" query parameter is passed', () => {
      return request(app.getHttpServer())
        .get('/habits?sortBy=name')
        .expect(200)
        .expect((res) => {
          expect(res.body[0].name <= res.body[1].name).toBe(true);
        });
    });
  });

  //~ find by Id
  describe('GET /habits/:id', () => {
    it('should return a habit by id', () => {
      //~ Taken from the 'fixtures/seed-data.json' file
      const habitId = '01K55HE98QWW8X73EVZ1YCE7FM';

      return request(app.getHttpServer())
        .get(`/habits/${habitId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(habitId);
        });
    });
  });

  //- Add the rest a test cases inside the Habit Controller
});
