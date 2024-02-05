import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Fix: Import the correct module '@nestjs/jwt'
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    /**
     * Creates a new user account and returns a JWT token.
     * @param signUpDto - The sign up data including name, email, and password.
     * @returns A promise that resolves to an object containing the JWT token.
     */
    async signUp(signUpDto): Promise<{token: string}> {
        const { nom, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ 
            nom, 
            email, 
            password: hashedPassword 
        });

        const token = this.jwtService.sign({id: user._id});

        return { token };
    }

    /**
     * Logs in a user and returns a JWT token.
     * @param loginDto - The login data including email and password.
     * @returns A promise that resolves to an object containing the JWT token.
     */
    async login(loginDto: LoginDto): Promise<{token: string}> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({email});

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password');
        }

        const token = this.jwtService.sign({id: user._id});

        return { token };

}

    /**
     * Deletes a user by their ID.
     * @param userId - The ID of the user to delete.
     * @returns A promise that resolves to a boolean indicating whether the user was successfully deleted.
     */
    async deleteUser(userId: string): Promise<boolean> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        return !!deletedUser;
    }






}



	

