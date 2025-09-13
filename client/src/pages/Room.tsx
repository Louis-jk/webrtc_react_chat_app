import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { VideoPlayer } from '../components/VideoPlayer';

export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream } = useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit('join-room', { roomId: id, peerId: me._id });
    console.log({ me });
  }, [id, me, ws]);

  return (
    <div>
      <VideoPlayer stream={stream} />
      <p className='text-2xl font-bold'>
        Room Number: <span className='text-rose-400'>{id}</span>
      </p>
      {me && (
        <p className='text-2xl font-bold'>
          My ID: <span className='text-emerald-400'>{me._id}</span>
        </p>
      )}
    </div>
  );
};
