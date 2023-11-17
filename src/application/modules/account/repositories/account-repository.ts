import { User } from '../entities/user';

export abstract class AccountRepository {
  abstract create(data: User): Promise<void>;
}
