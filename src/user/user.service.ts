import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import { createUserDto } from './dto/user.dto';
import { RefreshToken, User } from '@prisma/client';


@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if(!user) {
        throw new Error(`User not found`)
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create({ email, password }: createUserDto): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          password,
        },
      });
      return user;
    } catch (error) {
      console.log()
      throw new BadRequestException(error.meta);
    }
  }
}
