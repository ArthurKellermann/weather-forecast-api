import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
