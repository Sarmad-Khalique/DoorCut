import React, {useState} from 'react';
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
import FormInput from '../../../components/shared/FormInput';
import {COLORS} from '../../../theme';
import Button from '../../../components/shared/Button';
import {useNavigation} from '@react-navigation/native';
import api from '../../../config';
import {AuthContext} from '../../../context/auth/auth.provider';
import {LoadingContext} from '../../../context/loading/loading.provider';
import WithLoader from '../../../components/HOC/WithLoader';
import axios from 'axios';
import {FacebookLogin, GoogleLogin, LoginDivider} from '../../../constants';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {selectedRole} = React.useContext(AuthContext);
  const {setLoading} = React.useContext(LoadingContext);

  const navigation = useNavigation();
  const sendOTP = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setLoading(true);

    const config = {
      method: 'POST',
      url: 'https://api.doorcutapp.com/api/auth/register/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userName: name,
        email: email,
        password: password,
        isBarber: selectedRole === 'barber',
      },
    };
    try {
      const res = await axios.request(config);

      if (res.data.httpStatusCode !== 200) {
        console.log(res.data);
        Alert.alert('Error', res.data.message);
        return;
      }
      navigation.navigate('Verify', {
        email,
        name,
        password,
        userId: res.data.data.id,
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WithLoader>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Account As</Text>
        <Text style={styles.subHeading}>
          Fill your information below register with your social account
        </Text>
        <FormInput
          label="Name"
          placeholder={'Alex Jordan'}
          type={'text'}
          onChangeText={val => setName(val)}
          value={name}
        />
        <FormInput
          label="Email"
          placeholder={'example@example.com'}
          type={'text'}
          onChangeText={val => setEmail(val)}
          value={email}
        />
        <FormInput
          label="Password"
          placeholder={'********'}
          type={'password'}
          onChangeText={val => setPassword(val)}
          value={password}
        />
        <Button
          onClick={sendOTP}
          btnStyles={{
            marginTop: 20,
          }}>
          Sign Up
        </Button>
        <Image
          style={{
            marginVertical: 20,
            width: '100%',
            resizeMode: 'contain',
          }}
          source={LoginDivider}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity>
            <Image
              style={{
                marginEnd: 5,
              }}
              source={GoogleLogin}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{
                marginStart: 5,
              }}
              source={FacebookLogin}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            textAlign: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WithLoader>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
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
});
