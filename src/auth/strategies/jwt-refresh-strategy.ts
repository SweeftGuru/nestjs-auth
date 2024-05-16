import { TokenService } from "@app/token";
import { BadGatewayException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/PrismaService";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(private readonly tokenService : TokenService , private readonly prismaService : PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Corrected property name
            secretOrKey: process.env.JWT_REFRESH_SECRET // Corrected property name
        });
    }

    async validate(payload: any) {
        try {
            console.log(this.prismaService)
      
        //   // Query the database to find the refresh token object
          const users  =  await this.prismaService.user.findMany()
          console.log(users)
        //   console.log('Refresh token object:', tokenObj);
      
          return payload;
        } catch (error) {
          console.error('Error validating refresh token:', error);
          throw new BadGatewayException('Invalid refresh token', error);
        }
      }
}