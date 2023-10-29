interface PlayersProps {
  players: string[];
}

export const Players = ({ players }: PlayersProps) => {
  return (
    <div>
      <div>Players</div>
      <div>{JSON.stringify(players)}</div>
    </div>
  );
};
