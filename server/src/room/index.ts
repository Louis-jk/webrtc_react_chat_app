import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = ({ peerId }: { peerId: string }) => {
    const roomId = uuidv4();
    rooms[roomId] = [peerId];
    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log("a user created the room", roomId, peerId);
  };

  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      // 중복 체크: 같은 peerId가 이미 있는지 확인
      if (!rooms[roomId].includes(peerId)) {
        rooms[roomId].push(peerId);
        console.log("a user joined the room", roomId, peerId);
      } else {
        console.log("user already in room", roomId, peerId);
      }
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on("disconnect", () => {
      console.log("user left the room", peerId);
      leaveRoom({ roomId, peerId });
    });
  };

  const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
      socket.to(roomId).emit("user-left", { peerId });
    }
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
