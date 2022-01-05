import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text,} from 'react-native';
import { useReducer, useState } from 'react';
import PropTypes from 'prop-types'

function NumberButton({number, onButtonPress, currentSum}) {
    const handlePress = () => {
        onButtonPress(number + currentSum);
        
    }
  return (
    <TouchableOpacity onPress={handlePress}>
        <Text style={styles.numberBox}>{number}</Text>
    </TouchableOpacity>
  );
}

const defaultContainerStyle = {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
}
const styles = StyleSheet.create({
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

NumberButton.propTypes = {
    number: PropTypes.number.isRequired
}

export default NumberButton