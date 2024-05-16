import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super({usernameField: 'email'});
  }

  async validate(username  : string , password: string) {
    try {
       const email = username
       const user = await this.userService.findOne(email);
       if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...data } = user;
        return data;
      }
      if (!user) {
        throw new UnauthorizedException('user not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

