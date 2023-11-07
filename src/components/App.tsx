import { Game } from './Game';
import { GameActor, GameProvider, useStatelyGameActor } from './GameProvider';
import Loading from './Loading';
import {
  PlayerActor,
  PlayerProvider,
  useStatelyPlayerActor,
} from './PlayerProvider';

interface Props {
  gameActor: GameActor;
  playerActor: PlayerActor;
}

const App = (props: Props) => {
  return (
    <GameProvider actor={props.gameActor}>
      <PlayerProvider actor={props.playerActor}>
        <Game />
      </PlayerProvider>
    </GameProvider>
  );
};

const AppContainer = () => {
  const gameActor = useStatelyGameActor();
  const playerActor = useStatelyPlayerActor('player1');

  if (!gameActor || !playerActor) return <Loading />;

  return <App gameActor={gameActor} playerActor={playerActor} />;
};

export default AppContainer;
