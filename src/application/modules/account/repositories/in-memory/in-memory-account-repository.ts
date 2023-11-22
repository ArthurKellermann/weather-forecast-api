import { User } from '../../entities/user';
import { AccountRepository } from '../account-repository';

export class InMemoryAccountRepository extends AccountRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
