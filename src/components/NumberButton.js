import { StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types'

function NumberButton({dataKey, number, onButtonPress, isDisabled}) {

    const handlePress = () => {
      if(!isDisabled) onButtonPress({number:number, dataKey:dataKey});
    }

  return (
    <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.numberBox,(isDisabled && styles.isDisabled)]}>{number}</Text>
    </TouchableOpacity>
  );

}
let width = Dimensions.get('window').width;
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
    fontSize: width/10,
    margin: 15,
  },
  isDisabled:{
    opacity: 0.3,
  },
});

NumberButton.propTypes = {
  dataKey: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default NumberButton