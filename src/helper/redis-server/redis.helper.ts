import { Redis } from "ioredis";

// Create a Redis client
const redis = new Redis();

export const set_GetDataRedisHelper = async (
  userCode: string,
  code: string
) => {
  const cachedData = await redis.get(userCode);
  // If data is not in the cache, fetch it from the source
  // const dataToCache = { message: "Data to be cached" };
  await redis.set(userCode, code, "EX", 1000 * 60 * 60 * 3); // Cache for 3 hour

  return await redis.get(userCode);
};

export const defaultValueSetterHelper = (
  defaultCode: string,
  userCode: string
) => {
  const code = defaultCode;
  redis.set(userCode, code, "EX", 1000 * 60 * 60 * 3);
};

export const getSessionCodeHelper = async (userCode: string) => {
  return await redis.get(userCode);
};
