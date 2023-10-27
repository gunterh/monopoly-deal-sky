import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { Players } from './Players';
import { skyConfig } from './game.sky';
import { Login } from './login';

const url = 'https://sky.stately.ai/fdMVVT';

export const Game = () => {
  const [playerName, setPlayerName] = useState('');
  const [state, send] = useStatelyActor(
    {
      url,
      sessionId: 'monopoly-deal-rostros',
    },
    skyConfig,
  );

  const createGameEvent = {
    type: 'game.create' as const,
  };

  const startGameEvent = {
    type: 'game.start' as const,
  };

  const joinEvent = { type: 'game.addPlayer' as const, player: playerName };

  const playCardEvent = {
    type: 'player.playCard' as const,
    player: playerName,
  };

  const endTurnEvent = {
    type: 'player.endTurn' as const,
    player: playerName,
  };

  if (!send) return <div>loading...</div>;

  const playerHands = (state.context.playerHands ?? {}) as Record<
    string,
    string[]
  >;

  const hand = playerHands ? playerHands[playerName] : [];

  return (
    <div className="app">
      <div className="app-header">
        <h1>Monopoly Deal</h1>
        <button onClick={() => send({ type: 'game.restart' })}>Reset</button>
        <h2>
          <strong>Current State: {JSON.stringify(state.value)}</strong>
        </h2>
        <ul>
          {(hand || []).map((card) => {
            return (
              <li key={card}>
                <pre>
                  {JSON.stringify(
                    (state.context.cards as Record<string, any>)[card],
                  )}
                </pre>
              </li>
            );
          })}
        </ul>
        <Players players={state.context.players as string[]} />
        <Login playerName={playerName} setPlayerName={setPlayerName} />
        {state.can(createGameEvent) && (
          <button onClick={() => send(createGameEvent)}>Create Game</button>
        )}
        {state.can(joinEvent) && (
          <button onClick={() => send(joinEvent)}>Join Game</button>
        )}
        {state.can(startGameEvent) && (
          <button onClick={() => send(startGameEvent)}>Start Game</button>
        )}
        {state.can(playCardEvent) && (
          <button onClick={() => send(playCardEvent)}>Play Card</button>
        )}
        {state.can(endTurnEvent) && (
          <button onClick={() => send(endTurnEvent)}>End Turn</button>
        )}
      </div>
    </div>
  );
};
