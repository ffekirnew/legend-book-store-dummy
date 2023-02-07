import { Injectable } from '@nestjs/common';
import { Users } from 'src/auth/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { equal } from 'assert';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users)
    private readonly userrepo: Repository<Users>,)
    //I can do CRUD now...
    {}

    /**
     * logs in administrators
     */
    async login(dto:AuthDto) {
        const {username,password} = dto
        return "I'm logging in"
    }
    
    /**
     * signs up new users
     */
    async signup(dto:AuthDto) {

    }
    async signout(){

    }
}
