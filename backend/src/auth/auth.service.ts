import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const user: User = new User();

        user.salt = await bcrypt.genSalt();
        user.username = authCredentialsDto.username;
        user.password = await this.hashPassword(authCredentialsDto.password, user.salt);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code == "23505") {
                throw new ConflictException(`User with the username ${user.username} already exists. Pick another username.`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async logIn(authCredentialsDto: AuthCredentialsDto) {
        let { username, password } = authCredentialsDto;

        const user: User = await this.userRepository.findOne({ where: { username } });

        if (user && await user.checkPassword(password)) {
            console.log(user.checkPassword(password));
            return "login";
        } else if (user == null) {
            throw new NotFoundException(`That username doesn't exist.`);
        } else {
            throw new BadRequestException(`The username and the password don't match.`);
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
