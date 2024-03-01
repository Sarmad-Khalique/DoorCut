import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from '../../theme';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255, 255,0.6)',
        width: '100%',
        height: '100%',
        zIndex: 999,
      }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;
