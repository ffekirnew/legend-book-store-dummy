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
    async login(dto:AuthDto,res:Response) {
        console.log('Im in')
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
        // check the database entry for the user...

        const theUser = await this.userrepo.findOne({where:{username:Equal(username)}})
        if(theUser){
            throw new BadRequestException("username already taken")
        }

        const bufferedPass = Buffer.from(password)   // to match the type
        const user = new Users()
        user.username = username
        user.password = await this.hashPassword(bufferedPass); // using the encrypted password

        this.userrepo.create(user) 


        return "signup successfully ...."


    }
    async signout(dto:AuthDto){
        // delete the user until he decided to register again
        const {username,password} = dto 
        const theUser = await this.userrepo.findOne({where:{username:Equal(username)}})
        await this.userrepo.delete({username:username})

        return "wish you come back again"

    }
    async logout(req:Request,res:Response){
        // the user might want to log out but not permanently break his bond with the app... 
        res.clearCookie('middleware')
        return "logout successful"
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
