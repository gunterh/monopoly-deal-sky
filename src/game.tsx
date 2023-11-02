import { useSelector } from '@xstate/react';
import { useEffect, useState } from 'react';
import { ActorRefFrom } from 'xstate';
import { PlayerBoard } from './PlayerBoard';
import { Players } from './Players';
import { skyConfig } from './app.sky';
import { Login } from './login';

interface Props {
  actor: ActorRefFrom<typeof skyConfig.machine>;
}

export const Game = ({ actor }: Props) => {
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const subscription = actor?.subscribe((s) => {
      console.log('state', s);
    });
    return () => subscription?.unsubscribe();
  }, [actor]);

  const players = useSelector(actor, (state) => state.context.players);

  const createGameEvent = {
    type: 'game.create' as const,
  };

  const startGameEvent = {
    type: 'game.start' as const,
  };

  const joinEvent = { type: 'game.addPlayer' as const, player: playerName };

  const canCreateGame = useSelector(actor, (state) =>
    state.can(createGameEvent),
  );
  const canJoin = useSelector(actor, (state) => state.can(joinEvent));
  const canStartGame = useSelector(actor, (state) => state.can(startGameEvent));

  const state = useSelector(actor, (state) => state);

  return (
    <div className="app">
      <div className="app-header">
        <h2>{`${
          playerName ? playerName + ', ' : ''
        } Welcome to Monopoly Deal `}</h2>
        <Login playerName={playerName} setPlayerName={setPlayerName} />
      </div>
      <Players players={players as string[]} />
      {playerName && (
        <PlayerBoard state={state} playerName={playerName} send={actor.send} />
      )}
      <div className="button-group">
        {canCreateGame && (
          <button onClick={() => actor.send(createGameEvent)}>
            Create Game
          </button>
        )}
        {canJoin && (
          <button onClick={() => actor.send(joinEvent)}>Join Game</button>
        )}
        {canStartGame && (
          <button onClick={() => actor.send(startGameEvent)}>Start Game</button>
        )}
      </div>
    </div>
  );
};
