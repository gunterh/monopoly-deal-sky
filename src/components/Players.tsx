import styled from 'styled-components';

interface Props {
  players: string[];
  onSelectPlayer: (player: string) => void;
  selectedPlayer?: string;
  playerName?: string;
}

const TabButton = styled.button<{ active?: boolean; main?: boolean }>`
  background: ${(props) => (props.main ? 'gray' : 'none')};
  color: ${(props) => (props.main ? 'white' : 'black')};
  border: none;
  cursor: pointer;
  font-size: '1rem';
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  outline: none;
  border: ${(props) => (props.active ? '2px solid' : 'none')};
  &:hover {
    background: #eee;
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
`;

export const Players = (props: Props) => {
  return (
    <Tab>
      {props.players.map((player) => (
        <TabButton
          active={player === props.selectedPlayer}
          key={player}
          onClick={() => props.onSelectPlayer(player)}
          main={player === props.playerName}
        >
          {player}
        </TabButton>
      ))}
    </Tab>
  );
};