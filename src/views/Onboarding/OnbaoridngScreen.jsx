import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../theme';
import Skip from '../../components/shared/SkipButton';
import StepProgress from './StepProgress';
import OnboardingPrimary from './OnboardingPrimary';
import OnboardingSecondary from './OnboardingSecondary';
import OnboardingTertiary from './OnboardingTertiary';
import RoleSelection from './RoleSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const showOnboarding = async () => {
      const value = await AsyncStorage.getItem('onboarding');
      if (value !== null) {
        setCurrentStep(3);
      }
    };
    showOnboarding();
  }, []);

  React.useEffect(() => {
    if (currentStep === 3) {
      AsyncStorage.setItem('onboarding', 'true');
    }
  }, [currentStep]);

  return currentStep === 3 ? (
    <RoleSelection />
  ) : (
    <View style={styles.container}>
      <Skip
        onClick={() => {
          setCurrentStep(3);
        }}
      />
      <ScrollView
        style={{
          marginBottom: '20%',
        }}>
        {currentStep === 0 ? (
          <OnboardingPrimary />
        ) : currentStep === 1 ? (
          <OnboardingSecondary />
        ) : (
          <OnboardingTertiary />
        )}
      </ScrollView>
      <StepProgress currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  mainContent: {
    height: '70%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
    marginHorizontal: '5%',
  },
  content: {
    paddingHorizontal: '10%',
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    lineHeight: 34,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default OnboardingScreen;
