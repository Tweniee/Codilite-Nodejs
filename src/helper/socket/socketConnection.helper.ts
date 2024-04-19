import { socketIoInstance } from "../..";
import { javascriptCodeCompilerHelper } from "../IVM_Code/IVM_Compiler.helper";
import {
  defaultValueSetterHelper,
  getSessionCodeHelper,
  set_GetDataRedisHelper,
} from "../redis-server/redis.helper";

socketIoInstance.on("connection", (socket: any) => {
  socket.emit("demo", { userSessionCode: Math.random().toString(36).slice(6) });
  socket.on("joinRoom", async function (body: any) {
    const { roomId, defaultCode } = body;
    defaultValueSetterHelper(defaultCode, roomId);
    socket.join(roomId);
  });
  socket.on("baseCode", async function (code_roomId: any) {
    const { baseCode, roomId } = code_roomId;
    console.log(code_roomId);
    const code = await set_GetDataRedisHelper(roomId, baseCode);
    const output = javascriptCodeCompilerHelper(code);
    console.log(roomId, output);
    socketIoInstance.emit("output", { code, output });
    // .to(JSON.stringify(roomId))
  });
});

socketIoInstance.of("/").adapter.on("join-room", (room: any, id: any) => {
  console.log(`\n|\n|\nsocket ${id} has joined room \"${room}\"`);
});

socketIoInstance.of("/").adapter.on("create-room", (room: any) => {
  console.log(`\n|\n|\nroom \"${room}\" was created`);
});
