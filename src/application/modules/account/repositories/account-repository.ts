import { User } from '../entities/user';

export abstract class AccountRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}
