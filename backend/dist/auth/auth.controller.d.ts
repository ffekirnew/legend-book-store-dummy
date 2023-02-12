import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    logIn(authCredentialsDto: AuthCredentialsDto): Promise<string>;
}
