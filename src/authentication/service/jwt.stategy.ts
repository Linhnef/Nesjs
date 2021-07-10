import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy } from 'passport-jwt'
import { JwtPayload } from "../dto/jwtPayload.interface";
import { User } from "../entities/user.entites";
import { userRepository } from "../repository/user.repository";

export class JwtStategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(userRepository)
        private userRepository : userRepository,
    ){
        super({
            secretOrKey: 'secretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        })
    }

    async validate(paylaod : JwtPayload): Promise<User>{
        const {username} = paylaod;
        const user : User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}