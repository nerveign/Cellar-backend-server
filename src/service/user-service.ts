import bcrypt from 'bcrypt';

import { ResponseError } from '../error/response-error';
import { IUser, User } from '../models/user-model';
import {
    LoginUserRequest,
    RegisterUserRequest,
    toUserResponse,
    UserResponse,
} from '../types/user-type';
import { Request, Response } from 'express';
import { config } from '../config/config';

export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const { username, fullName, email, password } = request;

        if (!username || !fullName || !email || !password) {
            throw new ResponseError(400, 'All fields are required!');
        }

        if (password.length < 8) {
            throw new ResponseError(
                400,
                'Password must be at leasts 8 characters'
            );
        }

        const checkUsername = await User.findOne({ username });
        const checkEmail = await User.findOne({ email });

        if (checkUsername || checkEmail) {
            throw new ResponseError(400, 'Username or Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return toUserResponse(newUser);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const { email, password } = request;

        const user: IUser = (await User.findOne({ email })) as IUser;

        if (!user) {
            throw new ResponseError(400, 'Email or Password is wrong');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new ResponseError(400, 'Email or Password is wrong');
        }

        return toUserResponse(user);
    }
}
