import React, {useContext, useState} from 'react';
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
import useLoading from '../../../hooks/useLoading';
import axios from 'axios';
import WithLoader from '../../../components/HOC/WithLoader';
import {LoadingContext} from '../../../context/loading/loading.provider';
import useAuth from '../../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FacebookLogin, GoogleLogin, LoginDivider} from '../../../constants';
import {AuthContext} from '../../../context/auth/auth.provider';

const Login = () => {
  const [email, setEmail] = useState('sarmadkhalique001@gmail.com');
  const [password, setPassword] = useState('Sarmad2001');

  const navigation = useNavigation();
  const {setLoading} = useLoading();
  const {setUser} = useAuth();
  const {selectedRole} = React.useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    const config = {
      method: 'POST',
      url: 'https://api.doorcutapp.com/api/auth/login/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        password: password,
        confirmPassword: password,
      },
    };
    try {
      const res = await axios.request(config);
      const {token} = res.data.data;
      await AsyncStorage.setItem('token', token);
      setUser(res.data.data);
      if (res.data.httpStatusCode !== 200) {
        Alert.alert('Error', res.data.message);
      } else {
        const isBarber = selectedRole === 'barber';
        navigation.navigate(isBarber ? 'BarberHome' : 'Home', {
          userId: res.data.data.id,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WithLoader>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign in As</Text>
        <Text style={styles.subHeading}>
          hi! Welcome back, you've been missed
        </Text>
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
        <TouchableOpacity style={{marginBottom: 20}}>
          <Text style={styles.forgetLink}>Forget Password?</Text>
        </TouchableOpacity>
        <Button onClick={handleLogin}>Sign In</Button>
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
        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WithLoader>
  );
};

export default Login;

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
  signUpContainer: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
