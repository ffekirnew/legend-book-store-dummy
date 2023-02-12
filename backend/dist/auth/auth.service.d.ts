import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    logIn(authCredentialsDto: AuthCredentialsDto): Promise<"login" | "no access.">;
    hashPassword(password: string, salt: string): Promise<string>;
}
