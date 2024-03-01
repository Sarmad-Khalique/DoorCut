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
import useLoading from '../../../hooks/useLoading';
import axios from 'axios';
import WithLoader from '../../../components/HOC/WithLoader';
import {AuthContext} from '../../../context/auth/auth.provider';

const Verify = ({route}) => {
  const {email, name, password, userId} = route.params || {};
  const navigation = useNavigation();
  const {setLoading} = useLoading();
  const [otp, setOTP] = useState(['', '', '', '']);
  const {selectedRole} = React.useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    const config = {
      method: 'POST',
      url: 'https://api.doorcutapp.com/api/auth/emailVerification/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        otp: otp.join(''),
      },
    };
    try {
      const res = await axios.request(config);
      if (res.data.httpStatusCode !== 200) {
        Alert.alert('Error', res.data.message);
      } else {
        Alert.alert('Success', res.data.message, [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate(
                selectedRole === 'client'
                  ? 'ProfileCompletion'
                  : 'CompleteBarberProfile',
                {
                  email,
                  name,
                  password,
                  userId,
                },
              );
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WithLoader>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Image source={ArrowLeftSecondary} />
        </TouchableOpacity>
        <View style={styles.mainContent}>
          <Text style={styles.heading}>Verify Code</Text>
          <Text style={styles.subHeading}>
            Please enter the code we just sent to email
          </Text>
          <Text
            style={{
              ...styles.subHeading,
              color: COLORS.primary,
              marginBottom: 20,
            }}>
            {email}
          </Text>
          <OTP otp={otp} setOTP={setOTP} />
          <Text style={{...styles.subHeading, marginTop: 20}}>
            Didn't receive OTP?
          </Text>
          <TouchableOpacity>
            <Text style={styles.resendBtn}>Resend Code</Text>
          </TouchableOpacity>
          <Button
            onClick={handleSubmit}
            btnStyles={{
              marginTop: 10,
            }}>
            Verify
          </Button>
        </View>
      </View>
    </WithLoader>
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
