import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
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
import {ArrowLeftSecondary, ProfileImage} from '../../../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import useLoading from '../../../hooks/useLoading';
import WithLoader from '../../../components/HOC/WithLoader';
import AddService from '../../../components/BarberProfile/AddService';
import AddPackage from '../../../components/BarberProfile/AddPackage';
import AddAccount from '../../../components/BarberProfile/AddAccount';
import AddImage from '../../../components/BarberProfile/AddImage';
import WorkingHours from '../../../components/BarberProfile/WorkingHours';

const CompleteBarberProfile = ({route}) => {
  const {id} = route.params || {};
  const phone = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const [locationCoords, setLocationCoords] = useState(null);

  const {setLoading} = useLoading();

  useEffect(() => {
    const requestAuthorization = () => {
      Geolocation.requestAuthorization(
        _ => {
          Geolocation.getCurrentPosition(
            position => {
              setLocationCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.log('Error: ', error);
            },
            {enableHighAccuracy: true},
          );
        },
        err => {
          console.log('Err ', err);
        },
      );
    };
    requestAuthorization();
  });

  const data = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
  ];

  const saveBarberProfile = () => {
    setLoading(true);
    const config = {
      method: 'POTS',
      url: 'https://api.doorcutapp.com/api/barberProfile/save/',
      data: {
        phoneNumber: phone.current,
        aboutYou: about,
        userId: id,
        longitude: locationCoords?.longitude,
        latitude: locationCoords?.latitude,
      },
    };
    setLoading(false);
    setCurrentStep(2);
  };

  const navigation = useNavigation();

  return (
    <WithLoader>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setCurrentStep(currentStep - 1)}>
            <Image source={ArrowLeftSecondary} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: COLORS.textPrimary,
              fontFamily: 'Montserrat',
            }}>
            <Text>Step </Text>
            <Text
              style={{
                color: COLORS.primary,
              }}>
              {currentStep}
            </Text>
            /6
          </Text>
          <TouchableOpacity
            style={{
              opacity: currentStep < 2 ? 0 : 1,
            }}
            onPress={() => setCurrentStep(currentStep + 1)}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontFamily: 'Montserrat',
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        {currentStep === 1 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Complete Your Profile</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
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
              value={gender}
              setSelected={val => setGender(val)}
            />
            <FormInput
              label="About You"
              type="textArea"
              value={about}
              onChangeText={val => setAbout(val)}
            />
            <FormInput
              label="National Card"
              type="imagePicker"
              value={image}
              onChangeText={val => setImage(val)}
            />
            <Button
              onClick={saveBarberProfile}
              btnStyles={{
                marginTop: 20,
              }}>
              Next
            </Button>
          </ScrollView>
        ) : currentStep === 2 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Add Your Services</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
            </Text>
            <AddService />
          </ScrollView>
        ) : currentStep === 3 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Create Package</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
            </Text>
            <AddPackage />
          </ScrollView>
        ) : currentStep === 4 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Bank Details</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
            </Text>
            <AddAccount />
          </ScrollView>
        ) : currentStep === 5 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Add Images</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
            </Text>
            <AddImage />
          </ScrollView>
        ) : currentStep === 6 ? (
          <ScrollView style={styles.mainContent}>
            <Text style={styles.heading}>Select Working Hours</Text>
            <Text style={styles.subHeading}>
              Don't worry, only you can see your personal data. No one else will
              be able to see it.
            </Text>
            <WorkingHours />
          </ScrollView>
        ) : null}
        <View style={styles.buttonView}>
          <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
        </View>
      </View>
    </WithLoader>
  );
};

export default CompleteBarberProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    marginBottom: '20%',
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
  buttonView: {
    width: '100%',
    height: '15%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});
