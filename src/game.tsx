import { useStatelyActor } from '@statelyai/sky-react';
import { useEffect, useState } from 'react';
import { CardCollection } from './CardCollection';
import { Players } from './Players';
import { skyConfig } from './game.sky';
import { Login } from './login';

const url = 'https://sky.stately.ai/vhCmVE';

export const Game = () => {
  const [playerName, setPlayerName] = useState('');
  const [state, send, actor] = useStatelyActor(
    {
      url,
      sessionId: 'monopoly-deal-rostros',
    },
    skyConfig,
  );

  useEffect(() => {
    const subscription = actor?.subscribe((s) => {
      console.log('state', s);
    });
    return () => subscription?.unsubscribe();
  }, [actor]);

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
  const playerProperties = (state.context.playerProperties ?? {}) as Record<
    string,
    string[]
  >;
  const playerBank = (state.context.playerBanks ?? {}) as Record<
    string,
    string[]
  >;

  const hand = playerHands ? playerHands[playerName] ?? [] : [];
  const properties = playerProperties ? playerProperties[playerName] ?? [] : [];
  const bank = playerBank ? playerBank[playerName] ?? [] : [];
  const size = 80;

  const selectedCard =
    playerName === state.context.playerInTurn
      ? state.context.selectedCard
      : undefined;

  (window as unknown as any).state = state;

  const cardsPlayed =
    playerName === state.context.playerInTurn
      ? state.context.cardsPlayed
      : undefined;

  return (
    <div className="app">
      <div className="app-header">
        <h2>Monopoly Deal</h2>
        <Login playerName={playerName} setPlayerName={setPlayerName} />
      </div>
      <div
        style={{
          backgroundColor:
            state.context.playerInTurn === playerName ? '#c3e4c2' : '',
          padding: '10px',
          marginTop: '10px',
          marginBottom: '10px',
          border: '1px dashed black',
        }}
      >
        <CardCollection
          cards={state.context.cards ?? {}}
          size={size}
          hand={hand}
          title="Your Hand"
          onCardClick={(card) => {
            send({ type: 'player.selectCard', player: playerName, card });
          }}
          selectedCard={selectedCard}
          showPlayButton={state.can(playCardEvent)}
          onPlayCard={() => send(playCardEvent)}
          cardsPlayed={cardsPlayed}
        />

        <CardCollection
          cards={state.context.cards ?? {}}
          size={size}
          hand={properties}
          title="Properties"
          onCardClick={(card) => {
            send({ type: 'player.selectCard', player: playerName, card });
          }}
          selectedCard={selectedCard}
          showPlayButton={false}
          onPlayCard={() => {}}
        />

        <CardCollection
          cards={state.context.cards ?? {}}
          size={size}
          hand={bank}
          title="Your Bank"
          onCardClick={(card) => {
            send({ type: 'player.selectCard', player: playerName, card });
          }}
          selectedCard={selectedCard}
          showPlayButton={false}
          onPlayCard={() => {}}
        />

        <div className="button-group">
          {state.can(createGameEvent) && (
            <button onClick={() => send(createGameEvent)}>Create Game</button>
          )}
          {state.can(joinEvent) && (
            <button onClick={() => send(joinEvent)}>Join Game</button>
          )}
          {state.can(startGameEvent) && (
            <button onClick={() => send(startGameEvent)}>Start Game</button>
          )}

          {state.can(endTurnEvent) && (
            <button onClick={() => send(endTurnEvent)}>End Turn</button>
          )}
        </div>
      </div>
      <div>
        <strong>Current State: {JSON.stringify(state.value)}</strong>
      </div>{' '}
      <Players players={state.context.players as string[]} />
      <div className="button-group">
        <button onClick={() => send({ type: 'game.restart' })}>Reset</button>
      </div>
    </div>
  );
};
