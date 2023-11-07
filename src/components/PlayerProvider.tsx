import { useStatelyActor } from '@statelyai/sky-react';
import { createContext, useContext } from 'react';
import { Actor } from 'xstate';
import { skyConfig } from './PlayerProvider.sky';

export type PlayerActor = Actor<typeof skyConfig.machine>;

const PlayerActorContext = createContext<PlayerActor>({} as PlayerActor);

interface Props {
  actor: PlayerActor;
  children: React.ReactNode;
}

export const PlayerProvider = (props: Props) => {
  return (
    <PlayerActorContext.Provider value={props.actor}>
      {props.children}
    </PlayerActorContext.Provider>
  );
};

export const usePlayerActor = () => {
  return useContext(PlayerActorContext);
};

const url = 'https://sky.stately.ai/x4KjqH';

export const useStatelyPlayerActor = (player: string) => {
  const [, , actor] = useStatelyActor(
    {
      url,
      sessionId: 'player' + player,
    },
    // @ts-ignore
    skyConfig,
  );

  if (!actor) return undefined;

  return actor as unknown as PlayerActor;
};
