import { express } from "./dependencies/dependencies";

//db init
import "./database/database";

import { startUp } from "./startup/startup";
//PORT
const PORT = process.env.PORT || 3000;
//express server
const app = express();

//removing warnings
process.removeAllListeners("warning");

startUp(app);

const http = require("http").Server(app);

export const socketIoInstance = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
import "./helper/socket/socketConnection.helper";

export const server = http.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
