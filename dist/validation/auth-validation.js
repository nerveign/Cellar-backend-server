"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.REGISTER = zod_1.default.object({
    username: zod_1.default
        .string()
        .min(1)
        .max(100)
        .refine((value) => !value.includes(' '), {
        message: 'Cannot contain spaces',
    }),
    fullName: zod_1.default.string().min(1).max(100),
    email: zod_1.default.string().min(1).email(),
    password: zod_1.default.string().min(8),
});
AuthValidation.LOGIN = zod_1.default.object({
    email: zod_1.default.string().min(1).email(),
    password: zod_1.default.string().min(8),
});
