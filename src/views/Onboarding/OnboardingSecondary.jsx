import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {OnboardingImage2} from '../../constants';
import {COLORS} from '../../theme';

const OnboardingSecondary = () => {
  return (
    <View styles={styles.mainContent}>
      <Image source={OnboardingImage2} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Hairstylist</Text>
        <Text style={styles.description}>
          Now that you've seen who's available, it's time to choose your
          hairstylist! Review their profiles, experience, styles, and ratings to
          select the one that best fits your preferences. At DoorCut, we believe
          in giving you the power to choose who you trust with your hair.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    height: '60%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    resizeMode: 'cover',
    marginHorizontal: '5%',
  },
  content: {
    paddingHorizontal: '10%',
    paddingVertical: '5%',
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

export default OnboardingSecondary;
