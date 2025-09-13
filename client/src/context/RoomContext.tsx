import { createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const WS = 'http://localhost:8080';

const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    ws.on('room_created', enterRoom);
  }, []);
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};

export { RoomProvider, RoomContext };
