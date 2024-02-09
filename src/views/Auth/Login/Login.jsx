import React, {useState} from 'react';
import {
  Alert,
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
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
      <Button
        onClick={() =>
          Alert.alert('Sign In', `Email: ${email}\nPassword: ${password}`)
        }>
        Sign In
      </Button>
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
