import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import NumberButton from './NumberButton';

function Game({options}) {
    const [currSum, updateSum] = useState(0);
    useEffect(()=>{
        if(currSum == target){
            console.log("Win");
        };
    });
    const [randomNumbers] = useState(Array.from({length:options}).map(() => 1 + Math.floor(10 * Math.random())));
    const[target] = useState(randomNumbers.slice(0, options-2).reduce((partial_sum, current) => partial_sum + current, 0));
  return (
    <View style={styles.root}>
        <View style={styles.top}>
            <Text style={styles.numberBox}>{target}</Text>
        </View>
        <View style={styles.bottom}>
            {randomNumbers.map((number, index) => <NumberButton key={index} number={number} onButtonPress={updateSum} currentSum={currSum}/>)}    
        </View> 
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
});

Game.propTypes = {
    options: PropTypes.number.isRequired
}

export default Game