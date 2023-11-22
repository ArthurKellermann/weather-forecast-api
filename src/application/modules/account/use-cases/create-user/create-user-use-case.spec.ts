import { CreateUserUseCase } from './create-user-use-case';
import { InMemoryAccountRepository } from '../../repositories/in-memory/in-memory-account-repository';

describe('Create User', () => {
  let inMemoryAccountRepository: InMemoryAccountRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    inMemoryAccountRepository = new InMemoryAccountRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryAccountRepository);
  });

  it('should create a new user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'john doe',
      email: 'test@mail.com',
      password: 'test123',
    });

    expect(user).toHaveProperty('id');
    expect(inMemoryAccountRepository.users[0]).toEqual(user);
  });
});
