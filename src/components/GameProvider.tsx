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
    },
    // @ts-ignore
    skyConfig,
  );

  if (!actor) return undefined;

  return actor as unknown as GameActor;
};
