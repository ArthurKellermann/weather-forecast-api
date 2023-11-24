import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prismaService.$transaction(async (prisma) => {
      await prisma.user.deleteMany();
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new user', async () => {
    return await request(app.getHttpServer())
      .post('/api/account')
      .send({
        name: 'John doe',
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      })
      .expect(201);
  });

  it('should return the user token', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/account/auth')
      .send({
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
