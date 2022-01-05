import { StyleSheet, TouchableOpacity, Text,} from 'react-native';
import PropTypes from 'prop-types'

function NumberButton({dataKey, number, onButtonPress, isDisabled}) {

    const handlePress = () => {
      if(!isDisabled) onButtonPress(number, dataKey);
    }

  return (
    <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.numberBox,(isDisabled && styles.isDisabled)]}>{number}</Text>
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