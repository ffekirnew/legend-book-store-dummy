import { Injectable,BadRequestException } from '@nestjs/common';
import { Users } from 'src/auth/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { equal } from 'assert';
import * as bcrypt from "bcrypt";


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
        const theUser = await this.userrepo.findOne({where:{username:Equal(username)}})
        if(!theUser){
            throw new BadRequestException("wrong credential")
        }
        // if (theUser.password == password){
        //      return "login successful"
        // }
        const bufferedPass = Buffer.from(password)

        return "username or password is incorrect"
         

       
    }
    
    /**
     * signs up new users
     */
    async signup(dto:AuthDto) {
        const {username,password} = dto
        
        const bufferedPass = Buffer.from(password)

        const user = new Users()
        user.username = username
        user.password = await this.hashPassword(bufferedPass);

        this.userrepo.create(user)

        return "signup successfully ...."

        // check the database entry...



    }
    async signout(){

    }

    async hashPassword(password:Buffer){
        const saltOrRounds = 10
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }
    // async comparePass(){

    // }
}
