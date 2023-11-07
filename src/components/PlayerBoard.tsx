import { useSelector } from '@xstate/react';
import { CardCollection } from './CardCollection';
import { useGameActor } from './GameProvider';

interface Props {
  playerName: string;
  selectedPlayer: string;
}

export const PlayerBoard = ({ playerName, selectedPlayer }: Props) => {
  const actor = useGameActor();
  const playerHands = useSelector(
    actor,
    (state) => (state.context.playerHands ?? {}) as Record<string, string[]>,
  );
  const playerProperties = useSelector(
    actor,
    (state) =>
      (state.context.playerProperties ?? {}) as Record<string, string[]>,
  );
  const playerBank = useSelector(
    actor,
    (state) => (state.context.playerBanks ?? {}) as Record<string, string[]>,
  );
  const isPlaying = useSelector(actor, (state) => state.matches('playing'));

  const cardsPlayed = useSelector(actor, (state) =>
    selectedPlayer === state.context.playerInTurn
      ? state.context.cardsPlayed
      : undefined,
  );
  const hand = playerHands ? playerHands[selectedPlayer] ?? [] : [];
  const properties = playerProperties
    ? playerProperties[selectedPlayer] ?? []
    : [];
  const bank = playerBank ? playerBank[selectedPlayer] ?? [] : [];
  const size = 80;
  const selectedCard = useSelector(actor, (state) =>
    selectedPlayer === state.context.playerInTurn
      ? state.context.selectedCard
      : undefined,
  );
  const playerInTurn = useSelector(
    actor,
    (state) => state.context.playerInTurn,
  );
  const cards = useSelector(actor, (state) => state.context.cards);

  const playCardEvent = {
    type: 'player.playCard' as const,
    player: selectedPlayer,
  };
  const endTurnEvent = {
    type: 'player.endTurn' as const,
    player: selectedPlayer,
  };

  const canEndTurnEvent = useSelector(actor, (state) =>
    state.can(endTurnEvent),
  );

  const canPlayCardEvent = useSelector(actor, (state) =>
    state.can(playCardEvent),
  );

  if (!isPlaying) return null;

  return (
    <>
      <div
        style={{
          backgroundColor: playerInTurn === selectedPlayer ? '#c3e4c2' : '',
          padding: '10px',
          marginTop: '10px',
          marginBottom: '10px',
          border: '1px dashed black',
        }}
      >
        <CardCollection
          cards={cards ?? {}}
          size={size}
          hand={hand}
          title={`${selectedPlayer}'s Hand`}
          onCardClick={(card) => {
            actor.send({
              type: 'player.selectCard',
              player: selectedPlayer,
              card,
            });
          }}
          selectedCard={selectedCard}
          showPlayButton={canPlayCardEvent}
          onPlayCard={() => actor.send(playCardEvent)}
          cardsPlayed={cardsPlayed}
          showEmptyCard={selectedPlayer !== playerName}
        />

        <CardCollection
          cards={cards ?? {}}
          size={size}
          hand={properties}
          title="Properties"
          onCardClick={(card) => {
            actor.send({
              type: 'player.selectCard',
              player: selectedPlayer,
              card,
            });
          }}
          selectedCard={selectedCard}
          showPlayButton={false}
          onPlayCard={() => {}}
        />

        <CardCollection
          cards={cards ?? {}}
          size={size}
          hand={bank}
          title="Your Bank"
          onCardClick={(card) => {
            actor.send({
              type: 'player.selectCard',
              player: selectedPlayer,
              card,
            });
          }}
          selectedCard={selectedCard}
          showPlayButton={false}
          onPlayCard={() => {}}
        />
        {canEndTurnEvent && (
          <button onClick={() => actor.send(endTurnEvent)}>End Turn</button>
        )}
      </div>
      <div className="button-group">
        <button onClick={() => actor.send({ type: 'game.restart' })}>
          Reset
        </button>
      </div>
    </>
  );
};
