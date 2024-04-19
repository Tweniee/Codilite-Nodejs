import responseMessages from "../../constants/responseMessages";
import { Request, Response } from "../../dependencies/dependencies";
import { successResponse } from "../../helper/response.helper";
import { getRedisDataCodeOutputService } from "../../service/session/session.service";
export const getInitialSessionController = async (
  req: Request,
  res: Response
) => {
  const { roomId } = req.params;
  const { code, output } = await getRedisDataCodeOutputService(roomId);
  return successResponse(res, {
    message: responseMessages.INITIAL_ROUTE,
    data: { code, output },
  });
};
