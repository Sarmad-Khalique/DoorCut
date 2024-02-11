import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../theme';
import Button from '../../../components/shared/Button';
import OTP from '../../../components/OTP';
import {ArrowLeftSecondary} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const Verify = ({route}) => {
  const {email} = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image source={ArrowLeftSecondary} />
      </TouchableOpacity>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Verify Code</Text>
        <Text style={styles.subHeading}>
          Please enter the code we just sent to email
        </Text>
        <Text style={{...styles.subHeading, color: COLORS.primary}}>
          {email}
        </Text>
        <OTP />
        <Text style={{...styles.subHeading, marginTop: 20}}>
          Didn't receive OTP?
        </Text>
        <TouchableOpacity>
          <Text style={styles.resendBtn}>Resend Code</Text>
        </TouchableOpacity>
        <Button
          onClick={() => navigation.navigate('ProfileCompletion')}
          btnStyles={{
            marginTop: 10,
          }}>
          Verify
        </Button>
      </View>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  mainContent: {
    flex: 1,
    paddingVertical: 40,
  },
  heading: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  subHeading: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    lineHeight: 24,
  },
  forgetLink: {
    color: COLORS.primary,
    textAlign: 'right',
    marginVertical: 10,
  },
  resendBtn: {
    fontSize: 14,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'Montserrat-Bold',
  },
});
