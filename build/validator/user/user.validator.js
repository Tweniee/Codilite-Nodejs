"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../../dependencies/dependencies");
const validatorFunction_1 = require("../validatorFunction");
// <------------------------------------------Validation For User register--------------------------------->
exports.userRegisterValidation = (req, res, next) => {
    try {
        const userRegisterSchema = dependencies_1.Joi.object({
            username: dependencies_1.Joi.string().alphanum().min(3).max(30).required(),
            email: dependencies_1.Joi.string()
                .email() //{ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }
                .required(),
            password: dependencies_1.Joi.string().min(8).trim(true).required(),
        });
        const isValid = userRegisterSchema.validate(req.body);
        if (isValid.error) {
            return validatorFunction_1.validatorErrorMessage(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
