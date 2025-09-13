import { useCallback, useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export const JoinButton = () => {
  const { ws } = useContext(RoomContext);

  const handleJoin = useCallback(() => {
    ws.emit('join_room', {
      meetingId: '123',
    });
  }, [ws]);

  return (
    <button
      className='bg-rose-400 hover:bg-rose-500 cursor-pointer rounded-lg py-2 px-8 text-white'
      onClick={handleJoin}
    >
      Start new meeting
    </button>
  );
};
