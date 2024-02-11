import React from 'react';
import {COLORS} from '../../theme';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const SkipButton = ({onClick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text
        style={{
          color: COLORS.primary,
          marginStart: 'auto',
          paddingVertical: 10,
          paddingHorizontal: 10,
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
        }}>
        Skip
      </Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingHorizontal: 5,
  },
});
