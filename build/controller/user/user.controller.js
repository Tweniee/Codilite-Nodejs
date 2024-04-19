"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessages_1 = __importDefault(require("../../constants/responseMessages"));
const response_helper_1 = require("../../helper/response.helper");
const user_service_1 = require("../../service/user/user.service");
const statusCodes_1 = __importDefault(require("../../constants/statusCodes"));
exports.userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    let user = yield user_service_1.findUserByEmailService(email);
    user = yield user_service_1.findUserByUsernameService(username);
    if (user.length > 0) {
        return response_helper_1.errorResponse(res, {
            statusCode: statusCodes_1.default.BAD_REQUEST,
            message: responseMessages_1.default.USER_ALREADY_PRESENT,
            errors: {},
        });
    }
    const { createdAt, updatedAt } = yield user_service_1.userRegisterService({
        username,
        email,
        password,
    });
    return response_helper_1.successResponse(res, {
        message: responseMessages_1.default.USER_CREATED_SUCCESSFULLY,
        data: { username, email, createdAt, updatedAt },
    });
});
exports.userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    let user = yield user_service_1.findUserByEmailService(email);
    user = yield user_service_1.findUserByUsernameService(username);
    if (user.length == 0) {
        return response_helper_1.errorResponse(res, {
            statusCode: statusCodes_1.default.BAD_REQUEST,
            message: responseMessages_1.default.USER_NOT_PRESENT,
            errors: {},
        });
    }
    const userValidation = yield user_service_1.userLoginCheckService(user[0]["_id"], user[0]["salt"], password);
    if (!userValidation) {
        return response_helper_1.errorResponse(res, {
            statusCode: statusCodes_1.default.BAD_REQUEST,
            message: responseMessages_1.default.INVALIDS_LOGIN,
            errors: {},
        });
    }
    return response_helper_1.successResponse(res, {
        message: responseMessages_1.default.LOGIN_SUCCESS,
        data: { token: userValidation },
    });
});
