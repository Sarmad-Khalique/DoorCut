import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {OnboardingImage3} from '../../constants';
import {COLORS} from '../../theme';

const OnboardingTertiary = () => {
  return (
    <View styles={styles.mainContent}>
      <Image source={OnboardingImage3} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Contact Hairstylists</Text>
        <Text style={styles.description}>
          Simply tap to contact them directly through our app. Schedule your
          appointment, discuss styles, or ask questions with ease. DoorCut is
          committed to making your hairdressing experience as convenient and
          personalized as possible.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default OnboardingTertiary;
