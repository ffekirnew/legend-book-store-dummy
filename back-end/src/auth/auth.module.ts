import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from 'src/auth/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService,Users,JwtService]
})
export class AuthModule {}
