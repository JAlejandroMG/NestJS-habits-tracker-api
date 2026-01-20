/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as request from 'supertest';

import { getUserAccessToken } from './get-user-access-token';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

describe('habits', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getUserAccessToken();
  });

  //~ findAll
  describe('GET /habits', () => {
    it('should return an array of habits', () => {
      //~ app.getHttpServer is the utility that allow us
      //~ to pass the server that the supertest library
      //~ is going to work with
      return request(apiUrl)
        .get('/habits')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          //   console.log('res', res.body);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body.length).toBe(4);
        });
    });

    it('should return one habit when the "limit" query parameter is set to 1', () => {
      return request(apiUrl)
        .get('/habits?limit=1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it('should return a sorted array of habits when the "sortBy" query parameter is passed', () => {
      return request(apiUrl)
        .get('/habits?sortBy=name')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body[0].name <= res.body[1].name).toBe(true);
        });
    });

    describe('with invalid credentials', () => {
      it('should reject the request when the access token is missing from the headers', async () => {
        await request(apiUrl).get('/habits').expect(401);
      });

      it('should reject the request when the access token is invalid', async () => {
        await request(apiUrl)
          .get('/habits')
          .set('Authorization', 'Bearer some-invalid-token')
          .expect(401);
      });
    });
  });
});
