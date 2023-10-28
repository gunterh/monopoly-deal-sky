import styled from 'styled-components';

export type CardType =
  | {
      type: 'ActionCard';
      name: string;
      value: number;
    }
  | {
      type: 'MoneyCard';
      name: string;
      value: number;
    }
  | {
      type: 'PropertyCard';
      name: string;
      property: string;
      value: number;
      rent: number[];
    }
  | {
      type: 'PropertyWildCard';
      name: string;
      colors?: string[];
    }
  | {
      type: 'RentCard';
      name: string;
      colors?: string[];
      value: number;
    };

const Svg = styled.svg<{ size: number }>`
  width: ${(p: { size: number }) => p.size}px;
`;

const Title = styled.text`
  font-size: 40px;
`;

const ValueText = styled.text`
  font-size: 40px;
`;

interface CardValueProps {
  position: 'top' | 'bottom';
  value: number;
}

const CardValue = ({ value, position }: CardValueProps) => {
  const cx = position === 'top' ? 85 : 421;
  const cy = position === 'top' ? 85 : 701;
  return (
    <svg>
      <circle
        cx={cx}
        cy={cy}
        r="49"
        style={{
          stroke: '#000000',
          strokeWidth: 1,
          fill: 'none',
        }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="45"
        style={{
          stroke: '#000000',
          strokeWidth: 2,
          fill: 'none',
        }}
      />
      <ValueText x={cx} y={cy} alignmentBaseline="middle" textAnchor="middle">
        {value} M
      </ValueText>
    </svg>
  );
};

interface CardProps {
  size: number;
  title: string;
  value?: number;
  color: string;
  children?: React.ReactNode;
}

export const Card = ({ children, size, title, value, color }: CardProps) => (
  <Svg size={size} viewBox="0 0 506 786" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="506"
      height="786"
      rx="20"
      style={{
        stroke: '#000000',
        strokeWidth: 1,
        fill: 'white',
      }}
    />
    <rect
      x="20"
      y="20"
      width="466"
      height="746"
      rx="20"
      style={{ stroke: '#000000', strokeWidth: 2, fill: color }}
    />
    <Title x="50%" y="185" alignmentBaseline="middle" textAnchor="middle">
      {title}
    </Title>
    {value && (
      <>
        <CardValue position="top" value={value} />
        <CardValue position="bottom" value={value} />
      </>
    )}
    {children}
  </Svg>
);
