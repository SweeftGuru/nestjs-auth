import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaService';
import { createUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create({ email, username, password }: createUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          username,
          password,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
