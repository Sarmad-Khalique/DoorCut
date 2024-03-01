import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftSecondary, LocationSearch} from '../../../constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import FormInput from '../../../components/shared/FormInput';
import Geolocation from '@react-native-community/geolocation';
import {LoadingContext} from '../../../context/loading/loading.provider';
import WithLoader from '../../../components/HOC/WithLoader';
import api from '../../../config';

const CompleteProfile = ({route}) => {
  const {userId, phoneNumber, gender, image} = route.params || {};
  const [place, setPlace] = useState(null);
  const [address, setAddress] = useState('');
  const {setLoading} = React.useContext(LoadingContext);
  const navigation = useNavigation();

  const requestAuthorization = () => {
    setLoading(true);
    Geolocation.requestAuthorization(
      _ => {
        Geolocation.getCurrentPosition(
          position => {
            setPlace({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoading(false);
          },
          error => {
            setLoading(false);
            console.log('Error: ', error);
            Alert.alert('Error', 'Failed to get location');
          },
          {enableHighAccuracy: true},
        );
      },
      err => {
        setLoading(false);
        console.log('Err ', err);
        Alert.alert('Error', 'Failed to get location');
      },
    );
  };

  const postClientProfile = async () => {
    setLoading(true);
    try {
      console.log('Data: ', {
        userId,
        phoneNumber,
        genderId: gender === 'Male' ? 1 : 2,
        address,
        latitude: place.latitude,
        longitude: place.longitude,
        image,
      });
      const res = await api.post('/clientProfile/save/', {
        userId,
        phoneNumber,
        genderId: gender === 'Male' ? 1 : 2,
        address,
        latitude: place.latitude,
        longitude: place.longitude,
        image,
      });

      if (res.data.httpStatusCode !== 200) {
        console.log(res.data);
        Alert.alert('Error', res.data.message);
        return;
      }
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (place) {
      postClientProfile();
    }
  }, [place, address]);
  return (
    <WithLoader>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Image source={ArrowLeftSecondary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Complete Your Profile</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const {
              geometry: {
                location: {lat, lng},
              },
            } = details;

            setPlace({
              latitude: lat,
              longitude: lng,
            });
            setAddress(data.description);
          }}
          query={{
            key: 'AIzaSyB9URJOeFOdx0ewbIfNd2XUvl-gbBrJCGA',
            language: 'en',
          }}
          textInputProps={{
            InputComp: TextInput,
            style: {
              borderWidth: 2,
              borderColor: COLORS.textTertiary,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginVertical: 20,
              width: '100%',
            },
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 200,
            zIndex: -1,
            width: '100%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={requestAuthorization}>
            <Image source={LocationSearch} />
            <Text
              style={{
                color: '#323943',
                fontSize: 15,
                fontFamily: 'Montserrat',
                marginLeft: 10,
                fontWeight: '500',
              }}>
              Use my current location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WithLoader>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  heading: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
});
