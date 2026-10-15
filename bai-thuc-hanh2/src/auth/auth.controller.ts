import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.authService.login(body.userName, body.password);
  }

  @Get('auth')
  async auth(@Req() req: any) {
    return 'Hello World ' + req.user.userName;
  }
}
