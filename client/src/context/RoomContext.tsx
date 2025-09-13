import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const WS = 'http://localhost:8080';

const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};

export { RoomProvider, RoomContext };
