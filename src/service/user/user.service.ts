import { Types } from "mongoose";
import {
  checkPasswordHelper,
  passwordHashHelper,
} from "../../helper/password.helper";
import { userModel } from "../../models/user.model";
import { authTokenGeneratorHelper } from "../../helper/authentication.helper";

export const userRegisterService = async (body: {
  username: string;
  email: string;
  password: string;
}) => {
  const userDetails = await passwordHashHelper(body);
  const user = await userModel.create(userDetails);
  return user;
};

export const findUserByEmailService = async (email: string) => {
  const user = await userModel.aggregate([
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
};

export const findUserByUsernameService = async (username: string) => {
  const user = await userModel.aggregate([
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
};

export const userLoginCheckService = async (
  _id: string,
  salt: string,
  password: string
) => {
  const userHashedPassword = await checkPasswordHelper(password, salt);
  const user = await userModel.aggregate([
    {
      $match: {
        $and: [
          {
            _id: {
              $eq: new Types.ObjectId(_id),
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
    return authTokenGeneratorHelper(user[0]["_id"]);
  } else {
    return false;
  }
};
