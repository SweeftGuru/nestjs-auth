import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
   
  ],
})
export class AppModule {}
