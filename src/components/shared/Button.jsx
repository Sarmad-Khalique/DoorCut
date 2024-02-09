import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../theme';

const Button = ({onClick, children, ...props}) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...props.btnStyles}}
      onPress={onClick}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    width: '100%',
    borderRadius: 50,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
