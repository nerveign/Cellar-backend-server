"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth-route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/auth', auth_route_1.default);
exports.default = mainRouter;
