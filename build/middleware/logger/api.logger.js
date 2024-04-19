"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// <-------------------------------------------Request logger middleware---------------------------->
exports.requestLoggerMiddleware = (req, res, next) => {
    try {
        const hitApi = `${req.method} ${req.url}`;
        console.log(hitApi, "\n|\nv\n|\nv");
        next();
    }
    catch (error) {
        next(error);
    }
};
