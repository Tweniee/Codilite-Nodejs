"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessages_1 = __importDefault(require("../constants/responseMessages"));
const statusCodes_1 = __importDefault(require("../constants/statusCodes"));
const response_helper_1 = require("../helper/response.helper");
// <---------------------------------------------Validator Error Message------------------------------------------>
exports.validatorErrorMessage = (isValid, res) => {
    return response_helper_1.errorResponse(res, {
        statusCode: statusCodes_1.default.BAD_REQUEST,
        message: responseMessages_1.default.INVALID_PARAMETERS,
        errors: isValid.error.details[0].message,
    });
};
