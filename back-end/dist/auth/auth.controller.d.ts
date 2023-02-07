import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto): Promise<string>;
    signup(dto: AuthDto): Promise<void>;
    signout(): Promise<void>;
}
