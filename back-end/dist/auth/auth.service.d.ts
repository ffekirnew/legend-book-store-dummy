/// <reference types="node" />
import { Users } from 'src/auth/users.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userrepo;
    constructor(userrepo: Repository<Users>);
    login(dto: AuthDto): Promise<"login successful" | "username or password is incorrect">;
    signup(dto: AuthDto): Promise<string>;
    signout(): Promise<void>;
    hashPassword(password: Buffer): Promise<string>;
}
