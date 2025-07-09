"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (userId, res) => {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: config_1.config.jwt.expiresIn });
    res.cookie('jwt', token, Object.assign(Object.assign({}, config_1.config.cookiesOption), { maxAge: 7 * 24 * 60 * 60 * 1000 }));
    return token;
};
exports.generateToken = generateToken;
