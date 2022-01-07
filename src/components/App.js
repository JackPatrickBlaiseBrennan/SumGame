import { useReducer } from 'react';
import Game from './Game';

export default function App() {
  const[gameId, newGame] = useReducer(gameId => gameId + 1, 0)
  return (
    <Game key={gameId} playAgain={newGame} options={6}/>
  );
}

