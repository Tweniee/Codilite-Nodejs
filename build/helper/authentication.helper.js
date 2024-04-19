"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("../constants/constant"));
const dependencies_1 = require("../dependencies/dependencies");
exports.authTokenGeneratorHelper = (userId) => {
    const secretKey = constant_1.default.secretKey;
    const token = dependencies_1.sign({ userId }, secretKey);
    const refreshToken = dependencies_1.sign({ userId }, secretKey);
    return token;
};
