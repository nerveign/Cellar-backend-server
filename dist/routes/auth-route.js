"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const authRouter = express_1.default.Router();
authRouter.post('/register', user_controller_1.UserController.register);
authRouter.post('/login', user_controller_1.UserController.login);
authRouter.post('/logout', user_controller_1.UserController.logout);
exports.default = authRouter;
