import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme';

const StepIndicator = ({currentStep, setCurrentStep}) => {
  const MAX_STEPS = 3;
  return (
    <View style={styles.container}>
      {Array.from({length: MAX_STEPS}).map((_, index) => (
        <TouchableOpacity
          key={index}
          style={currentStep === index ? styles.active : styles.inactive}
          onPress={() => setCurrentStep(index)}
        />
      ))}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 5,
  },
  inactive: {
    backgroundColor: COLORS.primary,
    width: 10,
    height: 10,
    borderRadius: 7,
    opacity: 0.5,
    marginHorizontal: 5,
  },
});
