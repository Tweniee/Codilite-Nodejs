import {
  NextFunction,
  Request,
  Response,
  Joi,
} from "../../dependencies/dependencies";
import { validatorErrorMessage } from "../validatorFunction";

// <------------------------------------------Validation For User register--------------------------------->
export const userRegisterValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRegisterSchema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),

      email: Joi.string()
        .email() //{ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }
        .required(),

      password: Joi.string().min(8).trim(true).required(),
    });
    const isValid: any = userRegisterSchema.validate(req.body);
    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
};

