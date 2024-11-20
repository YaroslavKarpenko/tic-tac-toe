import React from 'react';

interface GameControlsProps {
  onNewGame: () => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onNewGame, gridSize, onGridSizeChange }) => {
  const handleGridSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onGridSizeChange(Number(event.target.value));
  };

  return (
    <div className="flex items-center justify-between p-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={onNewGame}>
        Нова гра
      </button>
      <div>
        <label htmlFor="gridSize" className="mr-2 font-semibold">
          Розмір сітки:
        </label>
        <select
          id="gridSize"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border py-2 px-3 rounded">
          {Array.from({ length: 7 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>
              {size}x{size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameControls;
