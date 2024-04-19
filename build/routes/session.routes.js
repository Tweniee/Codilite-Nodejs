"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_controller_1 = require("../controller/session/session.controller");
const dependencies_1 = require("../dependencies/dependencies");
const asyncHandler_helper_1 = require("../helper/asyncHandler.helper");
const route = dependencies_1.Router();
exports.sessionRoute = route;
route.get("/getInitialSession/:roomId", asyncHandler_helper_1.asyncHandler(session_controller_1.getInitialSessionController));
