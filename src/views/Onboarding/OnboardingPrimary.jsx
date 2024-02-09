import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {OnboardingImage1} from '../../constants';
import {COLORS} from '../../theme';

const OnboardingPrimary = () => {
  return (
    <View styles={styles.mainContent}>
      <Image source={OnboardingImage1} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Discover Nearby Hairstylists</Text>
        <Text style={styles.description}>
          Welcome to DoorCut! Start your journey by browsing through a variety
          of skilled hairstylists in your area. Our app allows you to see all
          available professionals near you, making it easier to find the perfect
          match for your hair needs.
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

export default OnboardingPrimary;
