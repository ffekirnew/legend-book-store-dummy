import { Users } from 'src/auth/users.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly userrepo;
    constructor(userrepo: Repository<Users>);
    login(dto: AuthDto): Promise<string>;
    signup(dto: AuthDto): Promise<void>;
    signout(): Promise<void>;
}
