import {
  userRegisterController,
  userLoginController,
} from "../controller/user/user.controller";
import { Router } from "../dependencies/dependencies";
import { asyncHandler } from "../helper/asyncHandler.helper";
import { userRegisterValidation } from "../validator/user/user.validator";

const route = Router();

route.post(
  "/resgister-user",
  userRegisterValidation,
  asyncHandler(userRegisterController)
);

route.post("/login", userRegisterValidation, asyncHandler(userLoginController));

export { route };
