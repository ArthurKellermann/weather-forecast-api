import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from './application/modules/account/auth/auth.module';
import { AuthService } from './application/modules/account/auth/services/auth.service';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}
