import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { loginDto } from '../dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({ email, password }: loginDto) {
    console.log(email, password);
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new Error('Invalid email or password')
    }
    return user;
  }
}
