import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticationCrendentialsDTO } from '../dto/authentication-credentials.dto';
import { AuthenticationService } from '../service/authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor( private readonly authenticationService : AuthenticationService){}
    @Post('/signup')
    signUp(@Body() user : authenticationCrendentialsDTO) : Promise<void>{
        return this.authenticationService.signUp(user);
    }

    @Post('/signin')
    signIn(@Body()user : authenticationCrendentialsDTO) : Promise<{accessToken : string}>{
        return this.authenticationService.signIn(user);
    }
    @Get('/test')
    test() : Promise<any>{
        return this.authenticationService.findTask();
    }
}
