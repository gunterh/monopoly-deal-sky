import { useState } from 'react';

interface LoginProps {
  playerName?: string;
  setPlayerName: (name: string) => void;
}

export const Login = ({ setPlayerName, playerName }: LoginProps) => {
  const [name, setName] = useState('');

  if (playerName) {
    return (
      <>
        <div className="app-header__player-name">
          <h3>{playerName}</h3>
        </div>
        <div>
          <button onClick={() => setPlayerName('')}>Logout</button>
        </div>
      </>
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
        <button onClick={() => setPlayerName(name)}>Login</button>
      </div>
    </>
  );
};
