"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("../routes"));
const database_1 = require("../config/database");
const error_middleware_1 = require("../middlewares/error-middleware");
exports.app = (0, express_1.default)();
(0, database_1.connectDB)();
// Middleware
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded());
exports.app.use((0, cors_1.default)());
exports.app.use((0, cookie_parser_1.default)());
// Route
exports.app.use(routes_1.default);
// Error Handler
exports.app.use(error_middleware_1.errorMiddleware);
