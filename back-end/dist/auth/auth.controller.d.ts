/// <reference types="express" />
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    signup(dto: AuthDto): Promise<string>;
    signout(dto: AuthDto): Promise<string>;
    logout(req: any, res: any): Promise<string>;
}
