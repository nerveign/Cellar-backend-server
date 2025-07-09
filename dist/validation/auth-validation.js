"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const helper_1 = require("../utils/helper");
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.REGISTER = zod_1.default.object({
    username: zod_1.default
        .string((0, helper_1.requiredMessage)('Username'))
        .min(1, {
        message: 'Username must be at least 1 character',
    })
        .max(100)
        .refine((value) => !value.includes(' '), {
        message: 'Username cannot contain spaces',
    }),
    fullName: zod_1.default
        .string((0, helper_1.requiredMessage)('Fullname'))
        .min(1, {
        message: 'Fullname must be at least 1 character',
    })
        .max(100),
    email: zod_1.default
        .string((0, helper_1.requiredMessage)('Email'))
        .min(5, {
        message: 'Email must be at least 5 character',
    })
        .email(),
    password: zod_1.default
        .string((0, helper_1.requiredMessage)('Password'))
        .min(8, {
        message: 'Password must be at least 8 character',
    })
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});
AuthValidation.LOGIN = zod_1.default.object({
    email: zod_1.default.string((0, helper_1.requiredMessage)('Email')).min(1).email(),
    password: zod_1.default.string((0, helper_1.requiredMessage)('Password')).min(8, {
        message: 'Password must be at least 8 character',
    }),
});
