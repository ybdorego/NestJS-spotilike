import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
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

    @Get('/api/login')
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


    @Delete('/api/users/:id')
    /**
     * Deletes a user by ID.
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves to a message indicating the success of the deletion.
     */
    async deleteUser(@Param('id') id: string
        ): Promise<{ message: string }> {
        await this.authService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }
}
