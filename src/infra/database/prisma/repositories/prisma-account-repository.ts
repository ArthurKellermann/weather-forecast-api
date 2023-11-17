import { User } from '@app/modules/account/entities/user';
import { AccountRepository } from '@app/modules/account/repositories/account-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(data);

    await this.prismaService.user.create({
      data: raw,
    });

    return;
  }
}
