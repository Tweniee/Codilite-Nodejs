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
const __1 = require("../..");
const IVM_Compiler_helper_1 = require("../IVM_Code/IVM_Compiler.helper");
const redis_helper_1 = require("../redis-server/redis.helper");
__1.socketIoInstance.on("connection", (socket) => {
    socket.emit("demo", { userSessionCode: Math.random().toString(36).slice(6) });
    socket.on("joinRoom", function (body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomId, defaultCode } = body;
            redis_helper_1.defaultValueSetterHelper(defaultCode, roomId);
            socket.join(roomId);
        });
    });
    socket.on("baseCode", function (code_roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { baseCode, roomId } = code_roomId;
            console.log(code_roomId);
            const code = yield redis_helper_1.set_GetDataRedisHelper(roomId, baseCode);
            const output = IVM_Compiler_helper_1.javascriptCodeCompilerHelper(code);
            console.log(roomId, output);
            __1.socketIoInstance.emit("output", { code, output });
            // .to(JSON.stringify(roomId))
        });
    });
});
__1.socketIoInstance.of("/").adapter.on("join-room", (room, id) => {
    console.log(`\n|\n|\nsocket ${id} has joined room \"${room}\"`);
});
__1.socketIoInstance.of("/").adapter.on("create-room", (room) => {
    console.log(`\n|\n|\nroom \"${room}\" was created`);
});
