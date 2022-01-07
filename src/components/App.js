import { useReducer } from 'react';
import Game from './Game';

export default function App() {

  const[appState, updateAppState] = useReducer(newGame, {gameId:0, initalSeconds:25});

  function newGame(prevAppState, prevGameState){
    let newAppState = {gameId:0, initalSeconds: 25};
      if (prevGameState === 'WON' && prevAppState.initalSeconds > 9){
        newAppState.initalSeconds = prevAppState.initalSeconds - 5;
      }
      else newAppState.initalSeconds = prevAppState.initalSeconds;
      newAppState.gameId = prevAppState.gameId++;
      return newAppState;
  }
  
  return (
    <Game key={appState.gameId} playAgain={updateAppState} options={6} initalSeconds={appState.initalSeconds}/>
  );
}

