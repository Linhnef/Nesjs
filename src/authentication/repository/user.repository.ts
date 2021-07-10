import { EntityRepository, Repository } from "typeorm";
import { authenticationCrendentialsDTO } from "../dto/authentication-credentials.dto";
import { User } from "../entities/user.entites";
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt';
import { ConflictException } from "@nestjs/common";
import { encoding } from "src/tools";


@EntityRepository(User)
export class userRepository extends Repository<User>{
    async createUser(user : authenticationCrendentialsDTO) : Promise<void>{
        const { username,password } = user;

        const encode = await encoding(password);
        const newUser = this.create({id : uuid() ,username,password : encode.hashPassword});
        try{
            await this.save(newUser);
        }catch(error){
            if(error.code == 11000){
                throw new ConflictException('Username already exist !!!');
            }
            console.log(error.code);
        }
        
    }
}