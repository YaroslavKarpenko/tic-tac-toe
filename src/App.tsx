import React, { useState } from 'react';
import PlayerStats from './components/PlayerStats';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import Modal from './components/Modal';
import Timer from './components/Timer';
import { Players } from './types';

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState(3); // Поточний розмір сітки
  const [pendingGridSize, setPendingGridSize] = useState(3); // Очікуваний розмір сітки

  const [board, setBoard] = useState<string[][]>(Array(3).fill(Array(3).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.X);
  const [playerWins, setPlayerWins] = useState({ X: 0, O: 0 });
  const [totalGames, setTotalGames] = useState(0);
  const [winner, setWinner] = useState<Players | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [timers, setTimers] = useState({ X: 0, O: 0 });
  const [resetTimers, setResetTimers] = useState(false);
  const [gameActive, setGameActive] = useState(true);

  const handleNewGame = () => {
    setGridSize(pendingGridSize);
    setBoard(Array(pendingGridSize).fill(Array(pendingGridSize).fill('')));
    setCurrentPlayer(Players.X);
    setWinner(null);
    setModalVisible(false);
    setTimers({ X: 0, O: 0 });
    setGameActive(true);
    setResetTimers(true);
    setTimeout(() => setResetTimers(false), 0);
  };

  const handleGridSizeChange = (size: number) => {
    setPendingGridSize(size);
  };

  const handleMove = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, rowIndex) =>
      rowIndex === row ? r.map((cell, colIndex) => (colIndex === col ? currentPlayer : cell)) : r,
    );
    setBoard(newBoard);

    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === Players.X ? Players.O : Players.X);
  };

  const checkWinner = (board: string[][]) => {
    const winConditions = [
      ...board, // рядки
      ...board[0].map((_, colIndex) => board.map((row) => row[colIndex])), // стовпці
      board.map((_, index) => board[index][index]), // головна діагональ
      board.map((_, index) => board[index][board.length - 1 - index]), // побічна діагональ
    ];

    for (const condition of winConditions) {
      if (condition.every((cell) => cell === Players.X)) {
        setWinner(Players.X);
        setPlayerWins((prev) => ({ ...prev, X: prev.X + 1 }));
        setGameActive(false);
        setTotalGames((prev) => prev + 1);
        setTimeout(() => setModalVisible(true), 2000);
        return;
      }
      if (condition.every((cell) => cell === Players.O)) {
        setWinner(Players.O);
        setPlayerWins((prev) => ({ ...prev, O: prev.O + 1 }));
        setGameActive(false);
        setTotalGames((prev) => prev + 1);
        setTimeout(() => setModalVisible(true), 2000);
        return;
      }
    }

    if (board.every((row) => row.every((cell) => cell !== ''))) {
      setGameActive(false);
      setTotalGames((prev) => prev + 1);
      setTimeout(() => setModalVisible(true), 2000);
    }
  };

  const handleTimeUpdate = (time: number, player: Players) => {
    if (!gameActive) return;
    setTimers((prev) => ({ ...prev, [player]: time }));
  };

  const getModalMessage = () => {
    if (winner) {
      return `Гравець ${winner === Players.X ? '1' : '2'} переміг! Час: ${timers[winner]} сек.`;
    }
    const totalTime = timers.X + timers.O;
    return `Нічия! Загальний час гри: ${totalTime} сек.`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Хрестики-Нулики</h1>
      <div className="flex justify-between items-center mb-4">
        <PlayerStats player="Гравець 1" symbol={Players.X} wins={playerWins.X} />
        <PlayerStats player="Гравець 2" symbol={Players.O} wins={playerWins.O} />
      </div>
      <div className="text-center font-medium text-lg mb-4">
        Ходить:{' '}
        <span className="font-bold">{currentPlayer === Players.X ? 'Гравець 1' : 'Гравець 2'}</span>
      </div>
      <GameControls
        onNewGame={handleNewGame}
        gridSize={pendingGridSize}
        onGridSizeChange={handleGridSizeChange}
      />
      <GameBoard gridSize={gridSize} board={board} onMove={handleMove} />
      <div className="flex justify-around mt-4">
        <Timer
          isActive={gameActive && currentPlayer === Players.X}
          reset={resetTimers}
          onTimeUpdate={(time) => handleTimeUpdate(time, Players.X)}
        />
        <Timer
          isActive={gameActive && currentPlayer === Players.O}
          reset={resetTimers}
          onTimeUpdate={(time) => handleTimeUpdate(time, Players.O)}
        />{' '}
      </div>
      <p className="text-center mt-4">
        Зіграно ігор: <span className="font-bold">{totalGames}</span>
      </p>
      <Modal
        isVisible={modalVisible}
        message={getModalMessage()}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default App;

