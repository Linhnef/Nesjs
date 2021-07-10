import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authenticationCrendentialsDTO } from '../dto/authentication-credentials.dto';
import { userRepository } from '../repository/user.repository';
import {encoding} from '../../tools/index';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dto/jwtPayload.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(userRepository)
        private authenticationRepository : userRepository,
        private jwtService : JwtService,
    ){}

    async signUp(user : authenticationCrendentialsDTO): Promise<void>{
        return this.authenticationRepository.createUser(user);
    }

    async signIn(user : authenticationCrendentialsDTO) : Promise<{accessToken : string}>{
        const { username,password } = user;
        const loginUser = await this.authenticationRepository.findOne({username});
        const encode = await encoding(password);
        if(loginUser && (await bcrypt.compare(password,loginUser.password))){
            const payload : JwtPayload = {username};
            const accessToken : string = await this.jwtService.sign(payload);
            return {accessToken};
        }else{
            throw new UnauthorizedException('Please check your login credentiasl !!!');
        }
    }
    async findTask(): Promise<any[]>{
        return this.authenticationRepository.find({
            relations : ['tasks'],
            where : {
                tasks:{
                   
                }
            }
        });
    }
}
