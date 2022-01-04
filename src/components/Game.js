import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function Game() {
    const[target, setTarget] = useState(Math.floor(40 * Math.random()));
  return (
    <View style={styles.root}>
        <View style={styles.top}>
            <Text style={styles.result}>{target}</Text>
        </View>
        <View style={styles.bottom}/>
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
    ...defaultContainerStyle
  },
  result:{
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 50,
  },
});
