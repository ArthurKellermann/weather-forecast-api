import { User } from '@app/modules/account/entities/user';
import { AccountRepository } from '@app/modules/account/repositories/account-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data,
    });

    return;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
