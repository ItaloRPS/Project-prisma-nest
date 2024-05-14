import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';


describe('post', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  it('should create a new task', async () => {
    const response = await request(app.getHttpServer())
      .post('/post')
      .send({ title: 'Test Task', description: 'This is a test task' })
      .expect(201);

    expect(response.body.title).toEqual('Test Task');
    expect(response.body.description).toEqual('This is a test task');
  });

  it('should fetch all post', async () => {
    const response = await request(app.getHttpServer())
      .get('/post')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a task', async () => {
    // Create a task first
    const createResponse = await request(app.getHttpServer())
      .post('/post')
      .send({ title: 'Test Task', description: 'This is a test task' })
      .expect(201);

    // Delete the task
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/post/${createResponse.body.id}`)
      .expect(200);

    expect(deleteResponse.body.message).toEqual('Task deleted successfully');
  });
});