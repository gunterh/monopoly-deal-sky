import { useSelector } from '@xstate/react';
import {
  BankCardCollection,
  HandCardCollection,
  PropertiesCardCollection,
} from './CardCollection';
import { useGameActor } from './GameProvider';
import { PlayerActorContext } from './PlayerActorContext';

export const PlayerBoard = () => {
  const selectedPlayer = PlayerActorContext.useSelector(
    (s) => s.context.selectedPlayer ?? '',
  );
  const playerName = PlayerActorContext.useSelector(
    (s) => s.context.playerName ?? '',
  );

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

  const playCardEvent = {
    type: 'player.playCard' as const,
    player: playerName,
  };
  const endTurnEvent = {
    type: 'player.endTurn' as const,
    player: playerName,
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
        <HandCardCollection size={size} />

        <PropertiesCardCollection size={size} />

        <BankCardCollection size={size} />
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
