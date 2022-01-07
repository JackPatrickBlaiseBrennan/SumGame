import { useReducer } from 'react';
import GameModel from './GameModel';

export default function App() {

  const[appState, updateAppState] = useReducer(newGame, {gameId:0, initalSeconds:25, options: 6});

  function newGame(prevAppState, prevGameState){
    let newAppState = {gameId:0, initalSeconds: 25, options: 6};
      if (prevGameState === 'WON' && prevAppState.initalSeconds > 9){
        newAppState.initalSeconds = prevAppState.initalSeconds - 5;
      }
      else newAppState.initalSeconds = prevAppState.initalSeconds;
      newAppState.gameId = prevAppState.gameId++;
      return newAppState;
  }
  
  return (
    <GameModel key={appState.gameId} playAgain={updateAppState} appState={appState}/>
  );
}

