import constant from "../constants/constant";
import { sign } from "../dependencies/dependencies";

export const authTokenGeneratorHelper = (userId: string) => {
  const secretKey = constant.secretKey;
  const token = sign({ userId }, secretKey);
  const refreshToken = sign({ userId }, secretKey);
  return token;
};
