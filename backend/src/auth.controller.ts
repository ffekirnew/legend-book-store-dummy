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
  login(@Body() dto, @Res() res) {
    return this.authService.login(dto, res);
  }

  /**
   * 
   */
  @Post('signup')
  signup(@Body() dto:AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('signout')
  signout(@Body() dto:AuthDto){
    return this.authService.signout(dto);
  }
  @Get()
  logout(@Req() req, @Res() res){
      return this.authService.logout(req,res)
  }
}
