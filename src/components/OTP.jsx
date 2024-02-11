import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { COLORS } from '../theme';

const OTP = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOTPKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={value => handleOTPChange(index, value)}
          onKeyPress={({nativeEvent: {key}}) => handleOTPKeyPress(index, key)}
          maxLength={1}
          keyboardType="numeric"
          placeholder='-'
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    borderColor: COLORS.textTertiary
  },
});

export default OTP;
