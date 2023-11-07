import { useState } from 'react';

interface LoginProps {
  playerName?: string;
  setPlayerName: (name: string) => void;
  setSelectedPlayer: (name: string) => void;
}

export const Login = ({
  setPlayerName,
  playerName,
  setSelectedPlayer,
}: LoginProps) => {
  const [name, setName] = useState('');

  if (playerName) {
    return (
      <div>
        <button onClick={() => setPlayerName('')}>Logout</button>
      </div>
    );
  }
  return (
    <>
      <div className="app-header__player-name">
        <input
          type="text"
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setPlayerName(name);
            setSelectedPlayer(name);
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};