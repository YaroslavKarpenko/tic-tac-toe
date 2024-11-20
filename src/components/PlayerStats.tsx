import React from 'react';
import { Players } from '../types';

interface PlayerStatsProps {
  player: string;
  symbol: Players;
  wins: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, symbol, wins }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-lg font-bold">{player}</h2>
      <p>
        Символ: <span className="font-semibold">{symbol}</span>
      </p>
      <p>
        Кількість виграшів: <span className="font-semibold">{wins}</span>
      </p>
    </div>
  );
};

export default PlayerStats;
