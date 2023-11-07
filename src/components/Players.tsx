import { useSelector } from '@xstate/react';
import styled from 'styled-components';
import { useGameActor } from './GameProvider';
import { PlayerActorContext } from './PlayerActorContext';

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

export const Players = () => {
  const actor = useGameActor();
  const players = useSelector(actor, (s) => s.context.players as string[]);
  const playerName = PlayerActorContext.useSelector(
    (s) => s.context.playerName,
  );
  const selectedPlayer = PlayerActorContext.useSelector(
    (s) => s.context.selectedPlayer,
  );
  const playerActor = PlayerActorContext.useActorRef();
  return (
    <Tab>
      {players.map((player) => (
        <TabButton
          active={player === selectedPlayer}
          key={player}
          onClick={() =>
            playerActor.send({
              type: 'SELECT_PLAYER',
              player,
            })
          }
          main={player === playerName}
        >
          {player}
        </TabButton>
      ))}
    </Tab>
  );
};
