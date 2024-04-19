import { response } from "express";
import responseMessages from "../../constants/responseMessages";
import { Request, Response, Socket } from "../../dependencies/dependencies";
import { errorResponse, successResponse } from "../../helper/response.helper";
import {
  findUserByEmailService,
  findUserByUsernameService,
  userLoginCheckService,
  userRegisterService,
} from "../../service/user/user.service";
import statusCodes from "../../constants/statusCodes";

export const userRegisterController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let user = await findUserByEmailService(email);
  user = await findUserByUsernameService(username);
  if (user.length > 0) {
    return errorResponse(res, {
      statusCode: statusCodes.BAD_REQUEST,
      message: responseMessages.USER_ALREADY_PRESENT,
      errors: {},
    });
  }
  const { createdAt, updatedAt } = await userRegisterService({
    username,
    email,
    password,
  });
  return successResponse(res, {
    message: responseMessages.USER_CREATED_SUCCESSFULLY,
    data: { username, email, createdAt, updatedAt },
  });
};

export const userLoginController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  let user = await findUserByEmailService(email);
  user = await findUserByUsernameService(username);
  if (user.length == 0) {
    return errorResponse(res, {
      statusCode: statusCodes.BAD_REQUEST,
      message: responseMessages.USER_NOT_PRESENT,
      errors: {},
    });
  }
  const userValidation = await userLoginCheckService(
    user[0]["_id"],
    user[0]["salt"],
    password
  );
  if (!userValidation) {
    return errorResponse(res, {
      statusCode: statusCodes.BAD_REQUEST,
      message: responseMessages.INVALIDS_LOGIN,
      errors: {},
    });
  }
  
  return successResponse(res, {
    message: responseMessages.LOGIN_SUCCESS,
    data: { token: userValidation },
  });
};
