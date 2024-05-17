import { Controller, Post , Body, UseGuards, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { createUserDto } from 'src/user/dto/user.dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/getUserFromJwt';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { userWithRefreshToken } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@GetUser() user : User) {  
    return this.authService.login(user)
  }

  @Post('/register')
  register(@Body() createUserDto: createUserDto ) {
    return this.authService.register(createUserDto)
  }


  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  refresh(@GetUser() user : userWithRefreshToken) {
    return this.authService.refresh(user);
  }


  @UseGuards(JwtGuard)
  @Post('/logout')
  logOut(@GetUser() user : User){
    return this.authService.logOut(user)
  }
}
