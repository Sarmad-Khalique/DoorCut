import React, {useState} from 'react';
import Step from '../../components/shared/StepIndicator';
import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftPrimary, ArrowRightPrimary} from '../../constants';
import { COLORS } from '../../theme';

const StepProgress = ({currentStep, setCurrentStep}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCurrentStep(currentStep - 1)}>
        <Image
          source={ArrowLeftPrimary}
          style={currentStep > 0 ? {opacity: 1} : {opacity: 0}}
        />
      </TouchableOpacity>
      <Step currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <TouchableOpacity onPress={() => setCurrentStep(currentStep + 1)}>
        <Image source={ArrowRightPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default StepProgress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
});
