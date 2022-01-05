import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types'
import NumberButton from './NumberButton';
import useEffectPostMount from './useEffectPostMount';


function Game({options}) {
    const [currSum, updateSum] = useState(0);
    useEffectPostMount(()=>{
      if(currSum >= target){
            if (currSum == target){
              console.log("Win");
              return
            }
            else{
              console.log("lose");
              return
            }
        }
    });
    const [selectedNumbers, updateSelected] = useState([]);
    const [randomNumbers] = useState(Array.from({length:options}).map(() => 1 + Math.floor(10 * Math.random())));
    const[target] = useState(randomNumbers.slice(0, options-2).reduce((partial_sum, current) => partial_sum + current, 0));
    function onNumberSelected (number, dataKey){
      updateSum(number + currSum);
      console.log(dataKey);
      updateSelected([...selectedNumbers, dataKey]);
      console.log(selectedNumbers)
    }
    function isNumberSelected (numberIndex, selectedNumbers) {return selectedNumbers.indexOf(numberIndex) >= 0};
    
  return (
    <View style={styles.root}>
        <View style={styles.top}>
            <Text style={styles.numberBox}>{target}</Text>
        </View>
        <View style={styles.bottom}>
            {randomNumbers.map((number, index) => 
              <NumberButton 
                key={index}
                dataKey={index}
                number={number} 
                onButtonPress={onNumberSelected} 
                isDisabled={isNumberSelected(index, selectedNumbers)}
              />
            )}    
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