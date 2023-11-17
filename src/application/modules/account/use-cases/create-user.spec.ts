import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user-use-case';

describe('AccountService', () => {
  let service: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserUseCase],
    }).compile();

    service = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
