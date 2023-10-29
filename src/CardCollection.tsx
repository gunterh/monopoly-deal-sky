import { Card, CardType } from './card';

interface CardCollectionProps {
  cards: Record<string, any>;
  size: number;
  hand: string[];
  title: string;
  selectedCard?: string;
  onCardClick: (card: string) => void;
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

export const CardCollection = ({
  cards,
  size,
  hand,
  title,
  selectedCard,
  onCardClick,
}: CardCollectionProps) => {
  return (
    <div>
      <h2>
        <strong>{title}</strong>
      </h2>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
