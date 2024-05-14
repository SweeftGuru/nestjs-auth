import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Corrected property name
            secretOrKey: process.env.JWT_SECRET // Corrected property name
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
