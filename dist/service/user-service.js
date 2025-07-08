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
const validation_1 = require("../validation/validation");
const auth_validation_1 = require("../validation/auth-validation");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.validate(auth_validation_1.AuthValidation.REGISTER, request);
            let { username, fullName, email, password } = registerRequest;
            username = username.toLowerCase();
            const checkUsername = yield user_model_1.User.findOne({ username });
            const checkEmail = yield user_model_1.User.findOne({ email });
            if (checkUsername || checkEmail) {
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
            const loginRequest = validation_1.Validation.validate(auth_validation_1.AuthValidation.LOGIN, request);
            const { email, password } = loginRequest;
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
