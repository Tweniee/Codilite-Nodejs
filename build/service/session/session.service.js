"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const IVM_Compiler_helper_1 = require("../../helper/IVM_Code/IVM_Compiler.helper");
const redis_helper_1 = require("../../helper/redis-server/redis.helper");
exports.getRedisDataCodeOutputService = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionCode = yield redis_helper_1.getSessionCodeHelper(roomId);
    const output = yield IVM_Compiler_helper_1.javascriptCodeCompilerHelper(sessionCode);
    return { code: sessionCode, output };
});
