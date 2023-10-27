interface PlayersProps {
  players: string[];
}

export const Players = ({ players }: PlayersProps) => {
  return (
    <div>
      <h3>Players</h3>
      <ul>
        {players.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
