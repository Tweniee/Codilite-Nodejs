"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../dependencies/dependencies");
const api_logger_1 = require("../middleware/logger/api.logger");
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
exports.startUp = (app) => {
    app.use(api_logger_1.requestLoggerMiddleware);
    app.use(cors_1.default());
    app.use(dependencies_1.express.json());
    app.use("/api/auth", routes_1.userRoute);
    app.use("/api/session", routes_1.sessionRoute);
};
