import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormInput from '../../../components/shared/FormInput';
import {COLORS} from '../../../theme';
import Button from '../../../components/shared/Button';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import {ArrowLeftSecondary} from '../../../constants';

const Profile = () => {
  const phone = useRef(null);
  const [gender, setGender] = useState('');

  const data = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Image source={ArrowLeftSecondary} />
      </TouchableOpacity>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Complete Your Profile</Text>
        <Text style={styles.subHeading}>
          Don't worry, only you can see your personal data. No one else will be
          able to see it.
        </Text>
        <FormInput
          label="Phone Number"
          initialCountry={'us'}
          initialValue="13178675309"
          textProps={{
            placeholder: 'Enter a phone number...',
          }}
          type={'phone'}
          ref={phone}
        />
        <FormInput
          label="Gender"
          type="select"
          data={data}
          value={'gender'}
          setSelected={val => setGender(val)}
        />
        <Button
          onClick={() => navigation.navigate('Location')}
          btnStyles={{
            marginTop: 20,
          }}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default Profile;

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
});
