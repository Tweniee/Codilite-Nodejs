"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../dependencies/dependencies");
const asyncHandler_helper_1 = require("../helper/asyncHandler.helper");
const route = dependencies_1.Router();
exports.route = route;
route.get("/getInitialSession", asyncHandler_helper_1.asyncHandler(getInitialSessionController));
