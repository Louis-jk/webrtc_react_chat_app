import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidv4();
    socket.join(roomId);
    socket.emit("room_created", { roomId });
    console.log("a user created the room");
  };
  const joinRoom = ({ roomId }: { roomId: string }) => {
    console.log("a user joined the room", roomId);
    socket.join(roomId);
  };

  socket.on("create_room", createRoom);
  socket.on("join_room", joinRoom);
};
