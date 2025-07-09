"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
const toUserResponse = (user) => {
    return {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
    };
};
exports.toUserResponse = toUserResponse;
