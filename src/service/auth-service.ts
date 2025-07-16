import { ResponseError } from '../error/response-error';
import { IUser, User } from '../models/user-model';
import bcrypt from 'bcrypt';
import {
    LoginUserRequest,
    RegisterUserRequest,
    toUserResponse,
    UserResponse,
} from '../types/user-type';
import { Response } from 'express';
import { Validation } from '../validation/validation';
import { AuthValidation } from '../validation/auth-validation';
import { config } from '../config/config';
import { checkUserExist } from '../utils/helper';

export class AuthService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest: RegisterUserRequest = Validation.validate(
            AuthValidation.REGISTER,
            request
        ) as RegisterUserRequest;
        let { username, fullName, email, password } = registerRequest;
        username = username.toLowerCase();

        await checkUserExist(username, email);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
        const loginRequest: LoginUserRequest = Validation.validate(
            AuthValidation.LOGIN,
            request
        ) as LoginUserRequest;
        const { email, password } = loginRequest;

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

    static logout(response: Response) {
        response
            .clearCookie('jwt', config.cookiesOption)
            .status(200)
            .json({ message: 'Logout account succesfully' });
    }
}
