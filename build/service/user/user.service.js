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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const password_helper_1 = require("../../helper/password.helper");
const user_model_1 = require("../../models/user.model");
const authentication_helper_1 = require("../../helper/authentication.helper");
exports.userRegisterService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield password_helper_1.passwordHashHelper(body);
    const user = yield user_model_1.userModel.create(userDetails);
    return user;
});
exports.findUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.aggregate([
        {
            $match: {
                email: {
                    $eq: email,
                },
            },
        },
        {
            $project: {
                password: 0,
                salt: 0,
            },
        },
    ]);
    return user;
});
exports.findUserByUsernameService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.aggregate([
        {
            $match: {
                username: {
                    $eq: username,
                },
            },
        },
        {
            $project: {
                password: 0,
            },
        },
    ]);
    return user;
});
exports.userLoginCheckService = (_id, salt, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userHashedPassword = yield password_helper_1.checkPasswordHelper(password, salt);
    const user = yield user_model_1.userModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        _id: {
                            $eq: new mongoose_1.Types.ObjectId(_id),
                        },
                    },
                    {
                        password: {
                            $eq: userHashedPassword,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                // result: {
                //   $cond: {
                //     if: {
                //       $eq: ["$password", userHashedPassword],
                //     },
                //     then: true,
                //     else: false,
                //   },
                // },
                _id: 1,
            },
        },
    ]);
    if (user.length > 0) {
        return authentication_helper_1.authTokenGeneratorHelper(user[0]["_id"]);
    }
    else {
        return false;
    }
});
