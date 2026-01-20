import * as request from 'supertest';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

describe('auth', () => {
  describe('POST /auth/login', () => {
    it('should return a JWT token when credentials are valid', async () => {
      await request(apiUrl)
        .post('/auth/login')
        .send({
          password: 'strong$$-10-Pass',
          username: 'Poly',
        })
        .expect(201)
        .expect((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(response.body.accessToken).toBeDefined();
        });
    });

    it('should return an unauthorized response when the credentials are invalid', async () => {
      await request(apiUrl)
        .post('/auth/login')
        .send({
          password: 'strong$$-10-Pas',
          username: 'Poly',
        })
        .expect(401)
        .expect((response) => {
          expect(response.body).toMatchObject({
            error: 'Unauthorized',
            message: 'Invalid credentials',
            statusCode: 401,
          });
        });
    });
  });
});
