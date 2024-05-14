import { Injectable } from '@nestjs/common';
import { loginDto, registerDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  
  public async validateUser({
    email,
    password,
  }:loginDto) {
    try {
      const user = await this.userService.findOne(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...data } = user;
        return data;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  async login(user: User): Promise<any> {
    try {
      delete user.password;
      return {
        ...user,
        accessToken: this.jwtService.signAsync(user),
      };
    } catch (error) {}
  }


}
