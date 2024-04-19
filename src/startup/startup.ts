import { Application, express } from "../dependencies/dependencies";
import { requestLoggerMiddleware } from "../middleware/logger/api.logger";
import { sessionRoute, userRoute } from "../routes";
import cors from "cors";
export const startUp = (app: Application) => {
  app.use(requestLoggerMiddleware);
  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", userRoute);
  app.use("/api/session", sessionRoute);
};
