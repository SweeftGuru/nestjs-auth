import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { TokenModule } from '@app/token';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { PrismaService } from 'src/PrismaService';

@Module({
  imports: [
    TokenModule,
    UserModule,
  ],
  controllers: [AuthController],

  providers: [AuthService, LocalStrategy, JwtStrategy,JwtRefreshStrategy],
})
export class AuthModule {}
