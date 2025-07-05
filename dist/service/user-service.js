"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_type_1 = require("../type/user-type");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, fullName, email, password } = request;
            if (!username || !fullName || !email || !password) {
                throw new response_error_1.ResponseError(400, 'All fields are required!');
            }
            if (password.length < 8) {
                throw new response_error_1.ResponseError(400, 'Password must be at leasts 8 characters');
            }
            const checkUsername = yield user_model_1.User.findOne({ username });
            if (checkUsername) {
                throw new response_error_1.ResponseError(400, 'Username or Email already exists');
            }
            const checkEmail = yield user_model_1.User.findOne({ email });
            if (checkEmail) {
                throw new response_error_1.ResponseError(400, 'Username or Email already exists');
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new user_model_1.User({
                username,
                fullName,
                email,
                password: hashedPassword,
            });
            yield newUser.save();
            return (0, user_type_1.toUserResponse)(newUser);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request;
            const user = (yield user_model_1.User.findOne({ email }));
            if (!user) {
                throw new response_error_1.ResponseError(400, 'Email or Password is wrong');
            }
            const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new response_error_1.ResponseError(400, 'Email or Password is wrong');
            }
            return (0, user_type_1.toUserResponse)(user);
        });
    }
    static logout(res) {
        res.cookie('jwt', '', { maxAge: 0 });
    }
}
exports.UserService = UserService;
