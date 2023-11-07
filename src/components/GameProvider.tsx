import { useStatelyActor } from '@statelyai/sky-react';
import { createContext, useContext } from 'react';
import { Actor } from 'xstate';
import { skyConfig } from './GameProvider.sky';

export type GameActor = Actor<typeof skyConfig.machine>;

const GameActorContext = createContext<GameActor>({} as GameActor);

interface Props {
  actor: GameActor;
  children: React.ReactNode;
}

export const GameProvider = (props: Props) => {
  return (
    <GameActorContext.Provider value={props.actor}>
      {props.children}
    </GameActorContext.Provider>
  );
};

export const useGameActor = () => {
  return useContext(GameActorContext);
};

const url = 'https://sky.stately.ai/zdNsCl';

export const useStatelyGameActor = () => {
  const [, , actor] = useStatelyActor(
    {
      url,
      sessionId: 'monopoly-deal',
      onPlayerJoined: ({ numberOfPlayers }) => {
        console.log('Player Joined. Number of players: ', numberOfPlayers);
      },
      onPlayerLeft: ({ numberOfPlayers }) => {
        console.log('Player left. Number of players: ', numberOfPlayers);
      },
    },
    // @ts-ignore
    skyConfig,
  );

  if (!actor) return undefined;

  return actor as unknown as GameActor;
};
