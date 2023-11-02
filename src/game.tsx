import { useStatelyActor } from '@statelyai/sky-react';
import { useMachine } from '@xstate/react';
import { useState } from 'react';
import { PlayerBoard } from './PlayerBoard';
import { Players } from './Players';
import { skyConfig } from './game.sky';
import { Login } from './login';

const url = 'https://sky.stately.ai/6yOdof';

export const Game = () => {
  const [playerName, setPlayerName] = useState('');
  // const [state, send] = useStatelyActor(
  //   {
  //     url,
  //     sessionId: 'monopoly-deal-rostros',
  //   },
  //   skyConfig,
  // );

  const [state, send] = useMachine(skyConfig.machine);

  if (!send) return <div>loading...</div>;

  const players = state.context.players;

  const createGameEvent = {
    type: 'game.create' as const,
  };

  const startGameEvent = {
    type: 'game.start' as const,
  };

  const joinEvent = { type: 'game.addPlayer' as const, player: playerName };

  const canCreateGame = state.can(createGameEvent);

  const canJoin = state.can(joinEvent);
  const canStartGame = state.can(startGameEvent);

  const handleSelectPlayer = (player: string) => {
    setPlayerName(player);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h2>{`${
          playerName ? playerName + ', ' : ''
        } Welcome to Monopoly Deal `}</h2>
        <Login playerName={playerName} setPlayerName={setPlayerName} />
      </div>
      <Players
        players={players as string[]}
        onSelectPlayer={handleSelectPlayer}
        playerName={playerName}
      />
      {playerName && (
        <PlayerBoard state={state} playerName={playerName} send={send} />
      )}
      <div className="button-group">
        {canCreateGame && (
          <button onClick={() => send(createGameEvent)}>Create Game</button>
        )}
        {canJoin && <button onClick={() => send(joinEvent)}>Join Game</button>}
        {canStartGame && (
          <button onClick={() => send(startGameEvent)}>Start Game</button>
        )}
      </div>
    </div>
  );
};
