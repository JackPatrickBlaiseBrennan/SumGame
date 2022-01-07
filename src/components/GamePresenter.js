import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'
import NumberButton from './NumberButton';


function GamePresenter({playAgain, onNumberSelected, sumState, gameState, remainingSeconds, randomNumbers}) {
  return (
    <View style={styles.root}>
        <View style={styles.top}>
            <Text style={[styles.numberBox, styles[`STATUS_${gameState.gameStatus}`]]}>{gameState.target}</Text>
        </View>
        <View style={styles.middle}>
            {randomNumbers.map((number, index) => 
              <NumberButton 
                key={index}
                dataKey={index}
                number={number} 
                onButtonPress={onNumberSelected} 
                isDisabled={sumState.isNumberSelected(index, sumState.selectedNumbers) || gameState.gameStatus !== 'PLAYING'}
              />
            )}    
        </View>
        <View style={styles.bottom}>
          <Text style={styles.timer}>{remainingSeconds}</Text>
          {gameState.gameStatus !== 'PLAYING' && (
            <Button title='Play Again' onPress={() => playAgain(gameState.gameStatus)}/>
          )}
        </View>
      <StatusBar style='auto' />
    </View>
  );
}

const width = Dimensions.get('window').width;

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

GamePresenter.propTypes = {
}

export default GamePresenter