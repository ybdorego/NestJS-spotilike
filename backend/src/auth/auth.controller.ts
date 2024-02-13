import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {


	constructor(private authService: AuthService) {
	}


    @Post('/api/signup')
    /**
     * Registers a new user.
     * @param signUpDto - The sign up data.
     * @returns A promise that resolves to an object containing the token.
     */
    async signUp(
        @Body() signUpDto: SignUpDto
        ): Promise<{token: string }>{
        return await this.authService.signUp(signUpDto)
    }

    @Post('/api/login')
    /**
     * Logs in a user.
     * @param loginDto - The login data.
     * @returns A promise that resolves to an object containing the token.
     */
    async login(
        @Body() loginDto: LoginDto
        ): Promise<{token: string }>{
        return await this.authService.login(loginDto)
    }
}
