import { useSelector } from '@xstate/react';
import { useGameActor } from './GameProvider';
import { Login } from './Login';
import { PlayerActorContext } from './PlayerActorContext';
import { PlayerBoard } from './PlayerBoard';
import { Players } from './Players';

export const Game = () => {
  const actor = useGameActor();

  const playerName = PlayerActorContext.useSelector(
    (state) => state.context.playerName ?? '',
  );

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

  return (
    <div className="app">
      <div className="app-header">
        <h2>{`${
          playerName ? playerName + ', ' : ''
        } Welcome to Monopoly Deal `}</h2>
        <Login />
      </div>
      <Players />
      {playerName && <PlayerBoard />}
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
