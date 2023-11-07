import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { useGameActor } from './GameProvider';
import { Login } from './Login';
import { PlayerBoard } from './PlayerBoard';
import { Players } from './Players';

export const Game = () => {
  const [playerName, setPlayerName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const actor = useGameActor();

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

  const handleSelectPlayer = (player: string) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h2>{`${
          playerName ? playerName + ', ' : ''
        } Welcome to Monopoly Deal `}</h2>
        <Login
          playerName={playerName}
          setPlayerName={setPlayerName}
          setSelectedPlayer={setSelectedPlayer}
        />
      </div>
      <Players
        players={players as string[]}
        onSelectPlayer={handleSelectPlayer}
        playerName={playerName}
        selectedPlayer={selectedPlayer}
      />
      {playerName && (
        <PlayerBoard playerName={playerName} selectedPlayer={selectedPlayer} />
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
