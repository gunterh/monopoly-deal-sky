import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { PlayerActorContext } from './PlayerActorContext';

const auth = getAuth();

export const Login = () => {
  const playerActor = PlayerActorContext.useActorRef();
  const playerName = PlayerActorContext.useSelector(
    (state) => state.context.playerName ?? '',
  );
  const [name, setName] = useState('');

  if (playerName) {
    return (
      <div>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    );
  }
  return <div>Waiting for authentication...</div>;
};
