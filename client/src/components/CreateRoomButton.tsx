import { useCallback, useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export const CreateRoomButton = () => {
  const { ws, me } = useContext(RoomContext);

  const handleCreateRoom = useCallback(() => {
    if (me) {
      ws.emit('create-room', { peerId: me.id });
    }
  }, [ws, me]);

  return (
    <button
      className='bg-rose-400 hover:bg-rose-500 cursor-pointer rounded-lg py-2 px-8 text-white'
      onClick={handleCreateRoom}
    >
      Start new meeting
    </button>
  );
};
