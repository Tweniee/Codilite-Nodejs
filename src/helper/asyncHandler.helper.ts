import {NextFunction, Request, Response} from "../dependencies/dependencies"
  // <----------------------------------------Async Errors Handler--------------------------------------------->
  export const asyncHandler = (handler: any) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await handler(req, res);
      } catch (error) {
        next(error);
      }
    };
  };