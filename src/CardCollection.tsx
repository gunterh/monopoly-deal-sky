import { Card, CardType } from './card';

interface CardCollectionProps {
  cards: Record<string, any>;
  size: number;
  hand: string[];
  title: string;
  selectedCard?: string;
  onCardClick: (card: string) => void;
  showPlayButton: boolean;
  onPlayCard: (card: string) => void;
  cardsPlayed?: number;
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

export const CardCollection = ({
  cards,
  size,
  hand,
  title,
  selectedCard,
  onCardClick,
  showPlayButton,
  onPlayCard,
  cardsPlayed,
}: CardCollectionProps) => {
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
          <strong>{title}</strong>
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
              <Card
                onClick={() => onCardClick(card)}
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
              {showPlayButton && card === selectedCard && (
                <div>
                  <button
                    onClick={() => onPlayCard(card)}
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
