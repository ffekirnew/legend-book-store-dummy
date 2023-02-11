import { Injectable,BadRequestException, ForbiddenException } from '@nestjs/common';
import { Users } from 'src/auth/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { equal } from 'assert';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from  '../auth/constants'
import { Response,Request } from 'express';



@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users)
    private readonly userrepo: Repository<Users>,
    private jwt:JwtService)

    //I can do CRUD now...
    {}

    /**
     * logs in administrators
     */
    async login(dto:AuthDto,req: Request ,res:Response) {

        const {username,password} = dto
        const theUser = await this.userrepo.findOne({where:{username:Equal(username)}})
        if(!theUser){
            throw new BadRequestException("wrong credential")
        }
        // if (theUser.password == password){
        //      return "login successful"
        // }
        const bufferedPass = Buffer.from(password) // to change the datatype of password into Buffer
        const hashed = theUser.password.toString()
        const isSame = bcrypt.compare(bufferedPass,hashed)
        if (!isSame){
            throw new BadRequestException("wrong credential")
        }
        
        // we gonna use Jwt for authentication...
        const token = await this.theToken({name:theUser.username, pass: theUser.password})
        // to create a protected route we gonna use cookie-parser as a middleware. 
        if(!token){
            throw new ForbiddenException()
        }
        res.cookie('middleware',token)
        res.send()

        return res.send("Login successful")
 
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
    async theToken(args: {name, pass}){
        // the args used as a payload here...
        
        return this.jwt.signAsync(args,{secret:jwtConstants.secret})
    }
}
