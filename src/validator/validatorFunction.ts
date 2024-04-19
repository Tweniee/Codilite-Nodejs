import { Response } from "../dependencies/dependencies";
import responseMessages from "../constants/responseMessages";
import statusCodes from "../constants/statusCodes";
import { errorResponse } from "../helper/response.helper";

// <---------------------------------------------Validator Error Message------------------------------------------>
export const validatorErrorMessage = (
  isValid: any,
  res: Response
): Response => {
  return errorResponse(res, {
    statusCode: statusCodes.BAD_REQUEST,
    message: responseMessages.INVALID_PARAMETERS,
    errors: isValid.error.details[0].message,
  });
};
