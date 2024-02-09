import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../theme';

const FormInput = ({label, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default FormInput;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    color: COLORS.textPrimary,
    marginVertical: 10
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.textTertiary,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
