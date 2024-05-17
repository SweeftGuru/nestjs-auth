import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { loginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { createUserDto } from 'src/user/dto/user.dto';
import { TokenService } from '@app/token';
import { userWithAcceseToken, userWithRefreshToken, userWithTokens } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: User): Promise<userWithTokens> {
    try {
      return {
        ...user,
        tokens: {
          accessToken: await this.tokenService.generateAccessToken(user),
          refreshToken: await this.tokenService.generateRefreshToken(user),
        },
      };
    } catch (error) {
      throw new HttpException(error.meta, HttpStatus.CONFLICT)
    }
  }

  public async register(createUserDto: createUserDto): Promise<userWithTokens> {
    try {
      const { password, ...user } = await this.userService.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      });
      return {
        ...user,
        tokens: {
          accessToken: await this.tokenService.generateAccessToken(user),
          refreshToken: await this.tokenService.generateRefreshToken(user),
        },
      };
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.CONFLICT)

    }
  }

  public async refresh(data : userWithRefreshToken ) : Promise<userWithAcceseToken>  {
    try {
      const {refreshToken , ...user} = data
      return {
        ...data,
        accessToken: await this.tokenService.generateAccessToken(user),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async logOut(user : User) : Promise<{userId : string , message : string}> {
    try {
      const {userId}  =  await this.tokenService.removeRefreshToken(user.id);
      return {

          userId : userId,
          message : 'user logged out'
        
      };
    } catch (error) {
      throw new HttpException(error.message.split('\n').reverse()[0], HttpStatus.CONFLICT)
    }
  }
}
