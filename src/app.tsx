import { useStatelyActor } from '@statelyai/sky-react';
import { skyConfig } from './app.sky';
import { Game } from './game';

const url = 'https://sky.stately.ai/U3vn3w';

export default function App() {
  const [state, send, actor] = useStatelyActor(
    {
      url,
      sessionId: 'monopoly-deal-rostros',
    },
    skyConfig,
  );
  if (!actor) return <div>loading...</div>;

  return <Game actor={actor} />;
}
