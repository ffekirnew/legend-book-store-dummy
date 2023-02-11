import { Body, Controller, Get, Post,Req,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  /**
   * 
   */
  @Post('login')
  login(@Req() req, @Res() res) {
    const dto = req.Body
    return this.authService.login(dto,req, res);
  }

  /**
   * 
   */
  @Post('signup')
  signup(@Body() dto:AuthDto) {
    return this.authService.signup(dto);
  }
  @Get()
  signout(){
    return this.authService.signout();
  }
}
