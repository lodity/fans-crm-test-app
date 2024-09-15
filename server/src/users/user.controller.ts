import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async addUser(
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    const user = await this.userService.addUser(name, password, email, phone);
    console.log(user);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'This is a protected route' };
  }
}
