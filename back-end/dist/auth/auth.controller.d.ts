import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto): Promise<"login successful" | "username or password is incorrect">;
    signup(dto: AuthDto): Promise<string>;
    signout(): Promise<void>;
}
