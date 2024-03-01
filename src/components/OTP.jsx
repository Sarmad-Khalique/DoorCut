import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../theme';
import useLoading from '../hooks/useLoading';

const OTP = ({otp, setOTP}) => {
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    console.log(`${index} -> ${value} -> ${otp[index]}`);
    if (value !== otp[index]) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
    }

    if (index < 3 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOTPKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
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
          keyboardType="numeric"
          maxLength={1}
          placeholder="-"
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
    borderColor: COLORS.textTertiary,
  },
});

export default OTP;
