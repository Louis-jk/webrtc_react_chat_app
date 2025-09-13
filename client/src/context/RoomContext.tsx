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
    ws.on('room-created', enterRoom);
    ws.on('get-users', getUsers);
  }, []);
  return (
    <RoomContext.Provider value={{ ws, me, getUsers }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
