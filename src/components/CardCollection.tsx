import { useSelector } from '@xstate/react';
import { Card, CardType, EmptyCard } from './Card';
import { useGameActor } from './GameProvider';
import { PlayerActorContext } from './PlayerActorContext';

interface CardCollectionProps {
  size: number;
}

const getColor = (card: CardType) => {
  if (card.type !== 'PropertyCard') {
    return 'white';
  }
  const colors = [
    'green',
    'darkblue',
    'lightblue',
    'red',
    'utility',
    'yellow',
    'orange',
    'brown',
    'purple',
    'railroad',
    'tenColor',
    'purpleOrange',
    'lightblueBrown',
    'lightblueRailroad',
    'darkblueGreen',
    'railroadGreen',
    'redYellow',
    'utilityRailroad',
  ];
  if (colors.includes(card.name)) {
    switch (card.name) {
      case 'utility':
        return 'lightgray';
      case 'railroad':
        return 'gray';
      case 'tenColor':
        return 'cyan';
      case 'purpleOrange':
        return 'lavender';
      case 'lightblueBrown':
        return 'navajowhite';
      case 'lightblueRailroad':
        return 'darkviolet';
      case 'darkblueGreen':
        return 'lime';
      case 'railroadGreen':
        return 'olive';
      case 'redYellow':
        return 'lightcoral';
      case 'utilityRailroad':
        return 'darkgray';
      default:
        return card.name;
    }
  }
  return 'white';
};

const Circle = ({ active }: { active?: boolean }) => {
  const size = 18;
  const centre = size / 2;
  const radius = centre - 1;
  return (
    <svg width={size} height={size}>
      <circle
        cx={centre}
        cy={centre}
        r={radius}
        style={{
          stroke: '#000000',
          strokeWidth: 1,
          fill: active ? 'green' : 'none',
        }}
      />
    </svg>
  );
};

export const HandCardCollection = ({ size }: CardCollectionProps) => {
  const actor = useGameActor();
  const cards = useSelector(actor, (state) => state.context.cards);
  const selectedPlayer = PlayerActorContext.useSelector(
    (s) => s.context.selectedPlayer ?? '',
  );
  const cardsPlayed = useSelector(actor, (state) =>
    selectedPlayer === state.context.playerInTurn
      ? state.context.cardsPlayed
      : undefined,
  );
  const playerHands = useSelector(
    actor,
    (state) => state.context.playerHands as Record<string, string[]>,
  );
  const playerName = PlayerActorContext.useSelector(
    (s) => s.context.playerName ?? '',
  );
  const hand = playerHands ? playerHands[selectedPlayer] ?? [] : [];
  const selectedCard = useSelector(
    actor,
    (state) => state.context.selectedCard,
  );

  const playCardEvent = {
    type: 'player.playCard' as const,
    player: playerName,
  };

  const canPlayCardEvent = useSelector(actor, (state) =>
    state.can(playCardEvent),
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <h2>
          <strong>`${selectedPlayer}'s Hand`</strong>
        </h2>
        {cardsPlayed !== undefined && (
          <>
            <Circle active />
            <Circle active={cardsPlayed > 0} />
            <Circle active={cardsPlayed > 1} />
          </>
        )}
      </div>
      <div
        style={{
          width: '80vw',
          overflowX: 'auto',
          display: 'flex',
          gap: '5px',
        }}
      >
        {hand.map((card) => {
          const deckCard = (cards as Record<string, any>)[card] as CardType;
          return (
            <div key={card}>
              {selectedPlayer !== playerName ? (
                <EmptyCard size={size} color="white" />
              ) : (
                <Card
                  onClick={() =>
                    actor.send({
                      type: 'player.selectCard',
                      player: playerName,
                      card,
                    })
                  }
                  selected={card === selectedCard}
                  color={getColor(deckCard)}
                  size={size}
                  title={deckCard.name}
                  value={
                    deckCard.type !== 'PropertyWildCard'
                      ? deckCard.value
                      : undefined
                  }
                  card={card}
                />
              )}
              {canPlayCardEvent && card === selectedCard && (
                <div>
                  <button
                    onClick={() => actor.send(playCardEvent)}
                  >{`Play card`}</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PropertiesCardCollection = ({ size }: CardCollectionProps) => {
  const actor = useGameActor();
  const cards = useSelector(actor, (state) => state.context.cards);
  const playerProperties = useSelector(
    actor,
    (state) =>
      (state.context.playerProperties ?? {}) as Record<string, string[]>,
  );
  const selectedPlayer = PlayerActorContext.useSelector(
    (s) => s.context.selectedPlayer ?? '',
  );
  const playerName = PlayerActorContext.useSelector(
    (s) => s.context.playerName ?? '',
  );
  const properties = playerProperties
    ? playerProperties[selectedPlayer] ?? []
    : [];
  const selectedCard = useSelector(
    actor,
    (state) => state.context.selectedCard,
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <h2>
          <strong>Properties</strong>
        </h2>
      </div>
      <div
        style={{
          width: '80vw',
          overflowX: 'auto',
          display: 'flex',
          gap: '5px',
        }}
      >
        {properties.map((card) => {
          const deckCard = (cards as Record<string, any>)[card] as CardType;
          return (
            <div key={card}>
              <Card
                onClick={() =>
                  actor.send({
                    type: 'player.selectCard',
                    player: playerName,
                    card,
                  })
                }
                selected={card === selectedCard}
                color={getColor(deckCard)}
                size={size}
                title={deckCard.name}
                value={
                  deckCard.type !== 'PropertyWildCard'
                    ? deckCard.value
                    : undefined
                }
                card={card}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BankCardCollection = ({ size }: CardCollectionProps) => {
  const actor = useGameActor();
  const cards = useSelector(actor, (state) => state.context.cards);
  const playerBank = useSelector(
    actor,
    (state) => (state.context.playerBanks ?? {}) as Record<string, string[]>,
  );
  const selectedPlayer = PlayerActorContext.useSelector(
    (s) => s.context.selectedPlayer ?? '',
  );
  const playerName = PlayerActorContext.useSelector(
    (s) => s.context.playerName ?? '',
  );
  const bank = playerBank ? playerBank[selectedPlayer] ?? [] : [];
  const selectedCard = useSelector(
    actor,
    (state) => state.context.selectedCard,
  );

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <h2>
          <strong>Properties</strong>
        </h2>
      </div>
      <div
        style={{
          width: '80vw',
          overflowX: 'auto',
          display: 'flex',
          gap: '5px',
        }}
      >
        {bank.map((card) => {
          const deckCard = (cards as Record<string, any>)[card] as CardType;
          return (
            <div key={card}>
              <Card
                onClick={() =>
                  actor.send({
                    type: 'player.selectCard',
                    player: playerName,
                    card,
                  })
                }
                selected={card === selectedCard}
                color={getColor(deckCard)}
                size={size}
                title={deckCard.name}
                value={
                  deckCard.type !== 'PropertyWildCard'
                    ? deckCard.value
                    : undefined
                }
                card={card}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
