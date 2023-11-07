import { useState } from 'react';
import { PlayerActorContext } from './PlayerActorContext';

export const Login = () => {
  const playerActor = PlayerActorContext.useActorRef();
  const playerName = PlayerActorContext.useSelector(
    (state) => state.context.playerName ?? '',
  );
  const [name, setName] = useState('');

  if (playerName) {
    return (
      <div>
        <button
          onClick={() =>
            playerActor.send({
              type: 'SET_PLAYER_NAME',
              playerName: '',
            })
          }
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="app-header__player-name">
        <input
          type="text"
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            playerActor.send({
              type: 'SET_PLAYER_NAME',
              playerName: name,
            });
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};
