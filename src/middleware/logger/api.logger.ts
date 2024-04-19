import {
  NextFunction,
  Request,
  Response,
} from "../../dependencies/dependencies";

// <-------------------------------------------Request logger middleware---------------------------->
export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hitApi = `${req.method} ${req.url}`;
    console.log(hitApi, "\n|\nv\n|\nv");
    next();
  } catch (error) {
    next(error);
  }
};
