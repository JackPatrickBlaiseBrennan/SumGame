import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import useEffectPostMount from './useEffectPostMount';
import GamePresenter from './GamePresenter';
import shuffle from 'lodash.shuffle';

function GameModel({playAgain, appState}){
    // Game State
    const [randomNumbers, shuffleNumbers] = useState(Array.from({length:appState.options}).map(() => 1 + Math.floor(10 * Math.random())));
    
    var gameStateTemplate = {
        gameStatus:'PLAYING',
        target: randomNumbers.slice(0, appState.options-2).reduce((partial_sum, current) => partial_sum + current, 0),
    }

    const [gameState, updateGameState] = useReducer(gameStateReducer, gameStateTemplate);
    
    function gameStateReducer(prevGameState, opData){
        let newGameState = gameStateTemplate;
        newGameState.target = prevGameState.target; 
        newGameState.gameStatus = opData.val;
        return newGameState;
    }

    // SumState
    const sumStateTemplate = {
        currSum: 0,
        selectedNumbers: [],
        isNumberSelected: function(numberIndex, selectedNumbers){return selectedNumbers.indexOf(numberIndex) >= 0;},
    }

    const [sumState, updateSumState] = useReducer(sumStateReducer, sumStateTemplate);

    function sumStateReducer(prevSumState, opData){
        let newSumState = sumStateTemplate;
        newSumState.selectedNumbers = [...prevSumState.selectedNumbers, opData.dataKey];
        newSumState.currSum = prevSumState.currSum + opData.number;
        if(newSumState.currSum >= gameState.target){
            if (newSumState.currSum === gameState.target){
                updateGameState({ val:'WON'});
                }
            else{
                updateGameState({val:'LOST'});
            }
        }
        return newSumState;
    }

    //TimerState
    const [remainingSeconds, updateSeconds] = useReducer(
        updateTimer
      , appState.initalSeconds);
        
    function updateTimer(remainingSeconds){
        if (remainingSeconds <= 1 || gameState.gameStatus !== 'PLAYING'){
            if (remainingSeconds <= 1 && gameState.gameStatus !== 'WON') {
                updateGameState({ val:'LOST'});
            }
            clearInterval(intervalId);
            return remainingSeconds -1
        }
        else return remainingSeconds -1
    }

    React.useEffect(() => {
        //runs when component mounted
        shuffleNumbers(shuffle(randomNumbers));
        intervalId = setInterval(() => updateSeconds(), 1000);
        return () => {
          //runs when unmounted
          clearInterval(intervalId);
        }
      }, []);
    
    return (
        <GamePresenter 
            key={appState.gameId} 
            playAgain={playAgain} 
            onNumberSelected={updateSumState} 
            sumState={sumState}
            gameState={gameState}
            randomNumbers={randomNumbers}
            updateGameState={updateGameState}
            remainingSeconds={remainingSeconds}
        />
    );
}

GameModel.propTypes = {
}

export default GameModel