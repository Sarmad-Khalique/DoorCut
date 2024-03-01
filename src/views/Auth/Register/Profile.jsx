import React, {useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FormInput from '../../../components/shared/FormInput';
import {COLORS} from '../../../theme';
import Button from '../../../components/shared/Button';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowLeftSecondary,
  CurrentLocationAccess,
  ProfileImage,
} from '../../../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import useLoading from '../../../hooks/useLoading';
import {AuthContext} from '../../../context/auth/auth.provider';
import {LocationContext} from '../../../context/location/location.provider';
import Geolocation from '@react-native-community/geolocation';

const Profile = ({route}) => {
  const {userId} = route.params || {};
  const phone = useRef(null);
  const [gender, setGender] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [showLocationProfile, setShowLocationProfile] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const {setLocation} = useContext(LocationContext);

  const data = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
  ];

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!phone.current || !gender || !userImage) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setShowLocationProfile(true);
  };

  const requestAuthorization = () => {
    setLoadingLocation(true);
    Geolocation.requestAuthorization(
      _ => {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log(phone.current);
            setLoadingLocation(false);
            navigation.navigate('CompleteProfile', {
              userId,
              phoneNumber: phone.current.getValue(),
              gender,
              image: userImage,
            });
          },
          error => {
            setLoadingLocation(false);
            console.log('Error: ', error);
            Alert.alert('Error', 'Failed to get location');
          },
          {enableHighAccuracy: true},
        );
      },
      err => {
        setLoadingLocation(false);
        console.log('Err ', err);
        Alert.alert('Error', 'Failed to get location');
      },
    );
  };

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
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary(
              {mediaType: 'photo', includeBase64: true},
              res => {
                if (res.didCancel) {
                  console.log('User cancelled image picker');
                } else if (res.error) {
                  console.log('Error while picking image', res.error);
                } else {
                  setUserImage(res.assets[0].base64);
                }
              },
            );
          }}
          style={{
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          {userImage ? (
            <Image
              source={{uri: `data:image/png;base64,${userImage}`}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          ) : (
            <Image source={ProfileImage} />
          )}
        </TouchableOpacity>
        <FormInput
          label="Phone Number"
          initialCountry={'us'}
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
          value={gender}
          setSelected={val => setGender(val)}
        />
        <Button
          onClick={handleSubmit}
          btnStyles={{
            marginTop: 20,
          }}>
          Continue
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationProfile}
        onRequestClose={() => {
          setShowLocationProfile(false);
        }}>
        <ScrollView
          style={{flex: 1, backgroundColor: COLORS.white, padding: 20}}>
          <Image source={CurrentLocationAccess} style={styles.image} />
          <Text style={styles.heading}>What is your location</Text>
          <Text style={styles.subHeading}>
            We need to know your location in order to suggest nearby services
          </Text>
          {loadingLocation ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <>
              <Button onClick={() => requestAuthorization()}>
                Allow Location Access
              </Button>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CompleteProfile', {
                    userId,
                    phoneNumber: phone.current.getValue(),
                    gender,
                    image: userImage,
                  })
                }>
                <Text style={styles.locationInputBtn}>
                  Enter Location Manually
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
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
    fontWeight: '600',
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
    marginVertical: 10,
  },
  forgetLink: {
    color: COLORS.primary,
    textAlign: 'right',
    marginVertical: 10,
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
    marginHorizontal: '5%',
  },
  locationInputBtn: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    lineHeight: 20,
    marginVertical: 10,
    marginBottom: 20,
  },
});
