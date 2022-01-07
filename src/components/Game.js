import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import NumberButton from './NumberButton';
import useEffectPostMount from './useEffectPostMount';
import shuffle from 'lodash.shuffle';

let width = Dimensions.get('window').width;
function Game({options, playAgain, initalSeconds}) {
  React.useEffect(() => {
    //runs when component mounted
    intervalId = setInterval(() => updateSeconds(), 1000);
    shuffleNumbers(shuffle(randomNumbers));
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
              setGameStatus('LOST');
            }
        }
    });
    const [gameStatus, setGameStatus] = useState('PLAYING');
    const [selectedNumbers, updateSelected] = useState([]);
    const [randomNumbers, shuffleNumbers] = useState(Array.from({length:options}).map(() => 1 + Math.floor(10 * Math.random())));
    const[target] = useState(randomNumbers.slice(0, options-2).reduce((partial_sum, current) => partial_sum + current, 0));
    const [remainingSeconds, updateSeconds] = useReducer(
      updateTimer
    , initalSeconds);

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
        <View style={styles.middle}>
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
        <View style={styles.bottom}>
          <Text style={styles.timer}>{remainingSeconds}</Text>
          {gameStatus !== 'PLAYING' && (
            <Button title='Play Again' onPress={() => playAgain(gameStatus)}/>
          )}
        </View>
      <StatusBar style='auto' />
    </View>
  );
}

const defaultContainerStyle = {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
}
const numberBox = {
  borderColor: 'black',
  borderWidth: 1,
  padding: 10,
  paddingLeft: 50,
  paddingRight: 50,
  margin: 15,
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...defaultContainerStyle
  },
  top:{
    flex: 2.5,
    ...defaultContainerStyle
  },
  middle:{
    flex:5.5,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  bottom:{
    ...defaultContainerStyle,
    flex: 2,
    justifyContent:'flex-start',
  },
  numberBox:{
    ...numberBox,
    fontSize: width/8,
    marginBottom:0,
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
  timer:{
    ...numberBox,
    fontSize: width/16,
    marginTop:0,
  },
});

Game.propTypes = {
    options: PropTypes.number.isRequired
}

export default Game