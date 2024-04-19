"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../constants/statusCodes"));
// <--------------------------------SuccessResponse is used to send all successful response to client------------------------>
exports.successResponse = (res, { message, data }) => {
    return res.status(statusCodes_1.default.SUCCESS).json({
        success: true,
        message,
        body: data,
    });
};
// <---------------------------------ErrorResponse is used to send all failure response to client---------------------------->
exports.errorResponse = (res, { statusCode, message, errors = {} }) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
