import { javascriptCodeCompilerHelper } from "../../helper/IVM_Code/IVM_Compiler.helper";
import { getSessionCodeHelper } from "../../helper/redis-server/redis.helper";

export const getRedisDataCodeOutputService = async (roomId: string) => {
  const sessionCode = await getSessionCodeHelper(roomId);
  const output = await javascriptCodeCompilerHelper(sessionCode);
  return { code: sessionCode, output };
};
