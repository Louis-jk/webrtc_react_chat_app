import { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Peer } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

const WS = 'http://localhost:8080';

const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  useEffect(() => {
    const peer = new Peer(uuidv4());
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(setStream);
    } catch (error) {
      console.error(error);
    }

    ws.on('room-created', enterRoom);
    ws.on('get-users', getUsers);
  }, []);

  useEffect(() => {
    if (!me || !stream) return;

    ws.on('user-joined', ({ peerId }) => {
      const call = me.call(peerId, stream);
    });

    me.on('call', (call) => {
      call.answer(stream);
    });
  }, [me, stream]);

  return (
    <RoomContext.Provider value={{ ws, me, getUsers, stream }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
