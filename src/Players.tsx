import styled from 'styled-components';

interface PlayersProps {
  players: string[];
}

const TabButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  outline: none;
  &:hover {
    background: #eee;
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
`;

export const Players = ({ players }: PlayersProps) => {
  return (
    <Tab>
      {players.map((player) => (
        <TabButton key={player}>{player}</TabButton>
      ))}
    </Tab>
  );
};
