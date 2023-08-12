import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { dataSourceOptions } from '../data-source';
import * as supertest from 'supertest';

let app: INestApplication;
let repository: Repository<User>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      UsersModule,
      // Use the e2e_test database to run the tests
      TypeOrmModule.forRoot(dataSourceOptions),
    ],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  repository = module.get('UserRepository');
});

beforeEach(async () => {
  const allUsers = await repository.find();
  await repository.delete(allUsers.map(({ id }) => id));
});

afterAll(async () => {
  await app.close();
});

describe('GET /users', () => {
  it('should return an array of users', async () => {
    expect(true).toBeTruthy();
    await repository.save([
      { email: 'email1@gmial.com' },
      { email: 'email2@gmail.com' },
    ]);

    const { body } = await supertest
      .agent(app.getHttpServer())
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual([
      { id: expect.any(Number), email: 'email1@gmial.com' },
      { id: expect.any(Number), email: 'email2@gmail.com' },
    ]);
  });
});
