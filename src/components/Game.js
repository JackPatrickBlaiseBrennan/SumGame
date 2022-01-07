import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import NumberButton from './NumberButton';
import useEffectPostMount from './useEffectPostMount';


function Game({options}) {
  React.useEffect(() => {
    //runs when component mounted
    intervalId = setInterval(() => updateSeconds(), 1000);
    return () => {
      //runs when unmounted
      clearInterval(intervalId);
    }
  }, []);

    const [currSum, updateSum] = useState(0);
    useEffectPostMount(()=>{
      if(currSum >= target){
            if (currSum == target){
              setGameStatus('WON');
            }
            else{
              setGameStatus("LOST");
            }
        }
    });
    const [gameStatus, setGameStatus] = useState('PLAYING');
    const [selectedNumbers, updateSelected] = useState([]);
    const [randomNumbers] = useState(Array.from({length:options}).map(() => 1 + Math.floor(10 * Math.random())));
    const[target] = useState(randomNumbers.slice(0, options-2).reduce((partial_sum, current) => partial_sum + current, 0));
    
    const [remainingSeconds, updateSeconds] = useReducer(
      updateTimer
    , 10);

    function onNumberSelected (number, dataKey){
      updateSum(number + currSum);
      updateSelected([...selectedNumbers, dataKey]);
    }

    function isNumberSelected (numberIndex, selectedNumbers)
      {return selectedNumbers.indexOf(numberIndex) >= 0};

    function updateTimer(remainingSeconds){
      if (remainingSeconds <= 1 || gameStatus !== 'PLAYING'){
        if (remainingSeconds <= 1) setGameStatus('LOST');
        clearInterval(intervalId);
        return remainingSeconds -1
      }
      else return remainingSeconds -1
      }
    
  return (
    <View style={styles.root}>
        <View style={styles.top}>
            <Text style={[styles.numberBox, styles[`STATUS_${gameStatus}`]]}>{target}</Text>
        </View>
        <View style={styles.bottom}>
            {randomNumbers.map((number, index) => 
              <NumberButton 
                key={index}
                dataKey={index}
                number={number} 
                onButtonPress={onNumberSelected} 
                isDisabled={isNumberSelected(index, selectedNumbers) || gameStatus !== 'PLAYING'}
              />
            )}    
        </View> 
        <Text>{remainingSeconds}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const defaultContainerStyle = {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...defaultContainerStyle
  },
  top:{
    flex: 1,
    ...defaultContainerStyle
  },
  bottom:{
    flex:2,
    justifyContent: 'center',
    flexWrap: "wrap",
    flexDirection: "row",
  },
  numberBox:{
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 50,
    margin: 15,
  },
  STATUS_PLAYING:{
    backgroundColor: '#fff',
  },
  STATUS_LOST:{
    backgroundColor: 'red',
  },
  STATUS_WON:{
    backgroundColor: 'green',
  },
});

Game.propTypes = {
    options: PropTypes.number.isRequired
}

export default Game