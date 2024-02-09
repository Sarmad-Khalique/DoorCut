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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
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
        onClick={() =>
          Alert.alert(
            'Sign Up',
            `Name: ${name}\nEmail: ${email}\nPassword: ${password}`,
          )
        }
        btnStyles={{
          marginTop: 20,
        }}>
        Sign Up
      </Button>
    </View>
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
