
import { getInitialSessionController } from "../controller/session/session.controller";
import { Router } from "../dependencies/dependencies";
import { asyncHandler } from "../helper/asyncHandler.helper";


const route = Router();

route.get("/getInitialSession/:roomId",asyncHandler(getInitialSessionController))

export { route as sessionRoute };