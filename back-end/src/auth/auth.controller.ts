import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  /**
   * 
   */
  @Post('login')
  login() {
    return "I am log in";
  }

  /**
   * 
   */
  @Post('signup')
  signup() {
    return "I am sign up";
  }
}
