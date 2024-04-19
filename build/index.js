"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("./dependencies/dependencies");
//db init
require("./database/database");
const startup_1 = require("./startup/startup");
//PORT
const PORT = process.env.PORT || 3000;
//express server
const app = dependencies_1.express();
//removing warnings
process.removeAllListeners("warning");
startup_1.startUp(app);
const http = require("http").Server(app);
exports.socketIoInstance = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
require("./helper/socket/socketConnection.helper");
exports.server = http.listen(PORT, () => {
    console.log("Listening to port", PORT);
});
