import { Game } from './Game';
import { GameActor, GameProvider, useStatelyGameActor } from './GameProvider';
import Loading from './Loading';
import { PlayerActorContext } from './PlayerActorContext';

interface Props {
  gameActor: GameActor;
}

const App = (props: Props) => {
  return (
    <GameProvider actor={props.gameActor}>
      <PlayerActorContext.Provider>
        <Game />
      </PlayerActorContext.Provider>
    </GameProvider>
  );
};

const AppContainer = () => {
  const gameActor = useStatelyGameActor();

  if (!gameActor) return <Loading />;

  return <App gameActor={gameActor} />;
};

export default AppContainer;
