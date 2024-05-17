import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@prisma/client';
import { rejects } from 'assert';
import { PrismaService } from 'src/PrismaService';

interface accessTokenPayload {
    id  : string;
    email : string;
}
interface refreshTokenPayload {
    id  : string;
    email : string;
}
@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  public async generateAccessToken(payload: accessTokenPayload): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  public async generateRefreshToken(payload: refreshTokenPayload) {
  

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret : this.configService.get<string>('JWT_REFRESH_SECRET')
      });
      await this.prismaService.refreshToken.create({data:{ token, userId : payload.id}})

      return token
    
  }

  public async removeRefreshToken(userId : string): Promise<any>{
      try {
        return await this.prismaService.refreshToken.delete({where : {userId}})
      } catch (error) {
        throw new Error(error.message);
      }
  }
}
