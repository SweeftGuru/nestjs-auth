import { Controller , Req ,Get, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/getUserFromJwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  // get unique user
  @UseGuards(JwtGuard)
  @Get()
  getUser(@GetUser() user: User){
    return this.userService.findOne(user.email)
  }
}
