import React from 'react';

interface GameBoardProps {
  gridSize: number; // розмірність сітки (3x3, 4x4...)
  onMove: (row: number, col: number) => void;
  board: string[][]; // стан сітки
}

const GameBoard: React.FC<GameBoardProps> = ({ gridSize, onMove, board }) => {
  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] === '') {
      onMove(row, col);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="grid gap-2 w-fit"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-16 h-16 flex items-center justify-center border border-gray-400 text-xl font-bold"
              onClick={() => handleCellClick(rowIndex, colIndex)}>
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default GameBoard;
