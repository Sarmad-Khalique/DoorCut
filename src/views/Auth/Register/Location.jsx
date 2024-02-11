import React, {useContext, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {LocationSVG} from '../../../constants';
import Button from '../../../components/shared/Button';
import {COLORS} from '../../../theme';
import {LocationContext} from '../../../context/location/location.provider';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

const Location = () => {
  const {setLocation} = useContext(LocationContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const requestAuthorization = () => {
    setLoading(true);
    Geolocation.requestAuthorization(
      _ => {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoading(false);
            navigation.navigate('CompleteProfile');
          },
          error => {
            setLoading(false);
            Alert.alert('Error', 'Failed to get location');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      },
      err => {
        setLoading(false);
        Alert.alert('Error', 'Failed to get location');
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Image source={LocationSVG} style={styles.image} />
        <Text style={styles.heading}>What is your location</Text>
        <Text style={styles.subHeading}>
          We need ti know your location in order to suggest nearby services
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            <Button onClick={() => requestAuthorization()}>
              Allow Location Access
            </Button>
            <TouchableOpacity>
              <Text style={styles.locationInputBtn}>
                Enter Location Manually
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '90%',
    resizeMode: 'contain',
    marginHorizontal: '5%',
  },
  heading: {
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    lineHeight: 34,
    marginVertical: 20,
  },
  subHeading: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginBottom: 25,
  },
  locationInputBtn: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    lineHeight: 20,
    marginVertical: 10,
  },
});
