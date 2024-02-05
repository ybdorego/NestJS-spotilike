import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Fix: Import the correct module '@nestjs/jwt'
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

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
}



	

