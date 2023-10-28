import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { Players } from './Players';
import { Card, CardType } from './card';
import { skyConfig } from './game.sky';
import { Login } from './login';

const url = 'https://sky.stately.ai/F3tuM9';

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
  const size = 100;

  const getColor = (card: CardType) => {
    const colors = ['red', 'green', 'blue', 'yellow', 'brown', 'orange'];
    if (colors.includes(card.name)) {
      return card.name;
    }
    return 'white';
  };
  return (
    <div className="app">
      <div className="app-header">
        <h2>Monopoly Deal</h2>
        <button onClick={() => send({ type: 'game.restart' })}>Reset</button>
        <h2>
          <strong>Current State: {JSON.stringify(state.value)}</strong>
        </h2>
        <div
          style={{
            width: '80vw',
            overflowX: 'auto',
            display: 'flex',
            gap: '1rem',
          }}
        >
          {(hand || []).map((card) => {
            const deckCard = (state.context.cards as Record<string, any>)[
              card
            ] as CardType;
            return (
              <div key={card}>
                <Card
                  color={getColor(deckCard)}
                  size={size}
                  title={deckCard.name}
                  value={
                    deckCard.type !== 'PropertyWildCard'
                      ? deckCard.value
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
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
