"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const userRouter = express_1.default.Router();
userRouter.post('/api/v1/register', user_controller_1.UserController.register);
userRouter.post('/api/v1/login', user_controller_1.UserController.login);
userRouter.post('/api/v1/logout', user_controller_1.UserController.logout);
exports.default = userRouter;
