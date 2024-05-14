import { Controller, Post , Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { createUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ,private userService : UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req : Request) {
    const user = req.user as User
    console.log(user)
    return this.authService.login(user)
  }

  @Post('/register')
  register(@Body() createUserDto: createUserDto ) {
    return this.userService.create(createUserDto)
  }


  // @Post('/logout')
  // logOut(){
  //   const token =
  //   return this.authService.logOut(token)
  // }
}
