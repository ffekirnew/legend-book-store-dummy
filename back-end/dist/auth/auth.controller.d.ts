/// <reference types="express" />
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
<<<<<<< HEAD
    login(dto: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
=======
    login(dto: AuthDto): Promise<string>;
>>>>>>> 8c3a22ebf95d4e1b0cacfa56421cca287dae2cd7
    signup(dto: AuthDto): Promise<string>;
    signout(dto: AuthDto): Promise<string>;
    logout(req: any, res: any): Promise<string>;
}
