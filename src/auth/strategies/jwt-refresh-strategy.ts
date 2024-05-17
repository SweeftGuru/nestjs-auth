import { TokenService } from "@app/token";
import { BadGatewayException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/PrismaService";
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(private readonly prismaService : PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Corrected property name
            secretOrKey: process.env.JWT_REFRESH_SECRET // Corrected property name
        });

    }

    async validate(payload: any) {
        try {
          const {iat , exp, ...user } = payload
          const {token}  =  await this.prismaService.refreshToken.findUnique({where: { userId : payload.id }})
          return {...user, refreshToken: token};
        } catch (error) {
          console.error('Error validating refresh token:', error);
          throw new BadGatewayException('Invalid refresh token', error);
        }
      }
}