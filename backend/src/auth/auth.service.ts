import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
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

    async logIn(authCredentialsDto: AuthCredentialsDto, res): Promise<boolean> {
        let { username, password } = authCredentialsDto;

        const user: User = await this.userRepository.findOne({ where: { username } });

        if ( !( user && await user.checkPassword(password) ) ) {
            return false
        }

        const userToken = await this.generateToken(username, password);

        if (!userToken) {
            throw new ForbiddenException();
        }

        res.cookie('jwtMiddleware', userToken);
        res.send();

        return true;

    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async generateToken(username: string, password: string): Promise<string> {
        return await this.jwtService.signAsync( { username, password },  { secret: "myname" });
    }
}
