import { useCallback, useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export const CreateRoomButton = () => {
  const { ws } = useContext(RoomContext);

  const handleCreateRoom = useCallback(() => {
    ws.emit('create_room');
  }, [ws]);

  return (
    <button
      className='bg-rose-400 hover:bg-rose-500 cursor-pointer rounded-lg py-2 px-8 text-white'
      onClick={handleCreateRoom}
    >
      Start new meeting
    </button>
  );
};
