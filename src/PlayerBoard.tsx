import { EventFromLogic, SnapshotFrom } from 'xstate';
import { CardCollection } from './CardCollection';
import { skyConfig } from './game.sky';

interface Props {
  state: SnapshotFrom<typeof skyConfig.machine>;
  playerName: string;
  selectedPlayer: string;
  send: (event: EventFromLogic<typeof skyConfig.machine>) => void;
}

export const PlayerBoard = ({
  state,
  playerName,
  send,
  selectedPlayer,
}: Props) => {
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

  if (!state.matches('playing')) return null;

  const cardsPlayed =
    selectedPlayer === state.context.playerInTurn
      ? state.context.cardsPlayed
      : undefined;

  const hand = playerHands ? playerHands[selectedPlayer] ?? [] : [];
  const properties = playerProperties
    ? playerProperties[selectedPlayer] ?? []
    : [];
  const bank = playerBank ? playerBank[selectedPlayer] ?? [] : [];
  const size = 80;

  const selectedCard =
    selectedPlayer === state.context.playerInTurn
      ? state.context.selectedCard
      : undefined;

  const playCardEvent = {
    type: 'player.playCard' as const,
    player: selectedPlayer,
  };

  const endTurnEvent = {
    type: 'player.endTurn' as const,
    player: selectedPlayer,
  };

  return (
    <>
      <div
        style={{
          backgroundColor:
            state.context.playerInTurn === selectedPlayer ? '#c3e4c2' : '',
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
          title={`${selectedPlayer}'s Hand`}
          onCardClick={(card) => {
            send({ type: 'player.selectCard', player: selectedPlayer, card });
          }}
          selectedCard={selectedCard}
          showPlayButton={state.can(playCardEvent)}
          onPlayCard={() => send(playCardEvent)}
          cardsPlayed={cardsPlayed}
          showEmptyCard={selectedPlayer !== playerName}
        />

        <CardCollection
          cards={state.context.cards ?? {}}
          size={size}
          hand={properties}
          title="Properties"
          onCardClick={(card) => {
            send({ type: 'player.selectCard', player: selectedPlayer, card });
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
            send({ type: 'player.selectCard', player: selectedPlayer, card });
          }}
          selectedCard={selectedCard}
          showPlayButton={false}
          onPlayCard={() => {}}
        />
        {state.can(endTurnEvent) && (
          <button onClick={() => send(endTurnEvent)}>End Turn</button>
        )}
      </div>
      <div className="button-group">
        <button onClick={() => send({ type: 'game.restart' })}>Reset</button>
      </div>
    </>
  );
};
