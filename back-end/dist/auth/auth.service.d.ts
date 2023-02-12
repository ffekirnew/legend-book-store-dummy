/// <reference types="node" />
import { Users } from 'src/auth/users.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AuthService {
    private readonly userrepo;
<<<<<<< HEAD
    private jwt;
    constructor(userrepo: Repository<Users>, jwt: JwtService);
    login(dto: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
=======
    constructor(userrepo: Repository<Users>);
    login(dto: AuthDto): Promise<string>;
>>>>>>> 8c3a22ebf95d4e1b0cacfa56421cca287dae2cd7
    signup(dto: AuthDto): Promise<string>;
    signout(dto: AuthDto): Promise<string>;
    logout(req: Request, res: Response): Promise<string>;
    hashPassword(password: Buffer): Promise<string>;
    theToken(args: {
        name: any;
        pass: any;
    }): Promise<string>;
}
