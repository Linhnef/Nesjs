import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './controller/authentication.controller';
import { userRepository } from './repository/user.repository';
import { AuthenticationService } from './service/authentication.service';
import { JwtStategy } from './service/jwt.stategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret: 'secretKey',
      signOptions:{
        expiresIn: 3600,
        
      }
    }),
    TypeOrmModule.forFeature([userRepository])
  ],
  providers: [AuthenticationService,JwtStategy],
  controllers: [AuthenticationController],
  exports: [JwtStategy,PassportModule]
})
export class AuthenticationModule {}
