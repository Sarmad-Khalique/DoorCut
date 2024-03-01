import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../theme';
import BottomNavigation from '../../../components/shared/BottomNavigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  CarousalImage,
  Location,
  MarkerIcon,
  User,
  UserPrimary,
} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {BarbersContext} from '../../../context/barbers/barbers.provider';
import WithLoader from '../../../components/HOC/WithLoader';
import {AuthContext} from '../../../context/auth/auth.provider';
import {LocationContext} from '../../../context/location/location.provider';
import BarberNavigation from '../../../components/shared/BarberNavigation';
import Button from '../../../components/shared/Button';

const BarberCard = ({id, name, image, location, rating}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginRight: 25,
        width: 303,
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
      }}
      onPress={() =>
        navigation.navigate('BarberDetails', {
          barberId: id,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: '600',
            color: '#161C21',
          }}>
          Nov 15 , 2024 - 10:00 AM
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.primary,
          }}>
          $45
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#797E86',
          opacity: 0.3,
          marginVertical: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={CarousalImage}
          style={{
            width: 90,
            height: 90,
            borderRadius: 10,
            marginEnd: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 14,
              fontWeight: '600',
              color: '#161C21',
              marginBottom: 10,
            }}>
            Hair combo , shaving
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}>
            <Image
              source={UserPrimary}
              style={{
                width: 10,
                resizeMode: 'contain',
                marginEnd: 5,
              }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 13,
                fontWeight: '400',
                color: '#797E86',
              }}>
              2 People
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}>
            <Image
              source={Location}
              style={{
                width: 10,
                resizeMode: 'contain',
                marginEnd: 5,
              }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 13,
                fontWeight: '400',
                color: '#797E86',
              }}>
              Sefton Park, Liverpool
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            width: '48%',
            backgroundColor: COLORS.white,
            padding: 10,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
              color: COLORS.primary,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '48%',
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
              color: COLORS.white,
            }}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BarberHome = () => {
  const [markers, setMarkers] = React.useState([
    {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      title: 'Current Location',
      description: `Coords: ${37.78825}, ${-122.4324}`,
    },
    {
      coordinate: {
        latitude: 37.79825,
        longitude: -122.4224,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
    },
    {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4524,
      },
      title: 'Third Best Place',
      description: 'This is the third best place in Portland',
    },
  ]);

  const {fetchBarbers, allBarbers: barbers} = React.useContext(BarbersContext);
  //   const {location} = React.useContext(LocationContext);
  const location = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  React.useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <WithLoader>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            ...location,
            longitudeDelta: 0.015,
            latitudeDelta: 0.0121,
          }}>
          <Marker coordinate={{...location}}>
            <Image
              source={MarkerIcon}
              style={{width: 15, height: 30}}
              resizeMode="contain"
            />
          </Marker>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}>
              <Image
                source={MarkerIcon}
                style={{width: 15, height: 30}}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
        <View style={styles.search}>
          <View style={{width: '100%'}}>
            <View
              style={{
                height: '100%',
                backgroundColor: COLORS.white,
                borderRadius: 10,
                padding: 10,
                paddingHorizontal: 40,
                paddingEnd: 60,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#323943',
                }}>
                {location?.latitude} {location?.longitude}
              </Text>
            </View>
            <Image
              source={Location}
              style={{
                position: 'absolute',
                top: 18,
                left: 10,
              }}
            />
            <IonIcons
              name="chevron-down"
              size={20}
              style={{
                position: 'absolute',
                top: 18,
                right: 10,
              }}
            />
          </View>
        </View>
        <FlatList
          data={barbers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <BarberCard
              name={item.name}
              rating={item.averageReview}
              location={item.address}
              image={CarousalImage}
              id={item.id}
            />
          )}
          style={styles.imageCarousal}
        />
        <BarberNavigation active={'home'} />
      </View>
    </WithLoader>
  );
};

export default BarberHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    marginBottom: 74,
  },
  search: {
    flexDirection: 'row',
    width: '100%',
    height: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    paddingHorizontal: 20,
  },
  imageCarousal: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 20,
  },
  barberName: {
    color: COLORS.white,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: COLORS.white,
    fontSize: 12,
    marginStart: 5,
  },
  location: {
    color: COLORS.white,
    fontSize: 12,
  },
});
