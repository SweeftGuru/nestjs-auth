import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/PrismaService';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(process.env.JWT_SECRET),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService,PrismaService , JwtService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
