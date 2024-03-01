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
import {COLORS} from '../../theme';
import BottomNavigation from '../../components/shared/BottomNavigation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {CarousalImage, Filters, MarkerIcon} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {BarbersContext} from '../../context/barbers/barbers.provider';
import WithLoader from '../../components/HOC/WithLoader';
import {AuthContext} from '../../context/auth/auth.provider';
import {LocationContext} from '../../context/location/location.provider';

const BarberCard = ({id, name, image, location, rating}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginRight: 25,
        width: 230,
        height: 75,
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
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={image}
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            width: '70%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat-Bold',
                color: COLORS.textPrimary,
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IonIcons name="star" size={16} color={COLORS.yellow} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat',
                  color: COLORS.textPrimary,
                  marginHorizontal: 2,
                }}>
                {rating}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IonIcons name="location-sharp" size={24} color={COLORS.primary} />
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Montserrat',
                color: COLORS.textPrimary,
              }}>
              {location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Map = () => {
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
  const {location} = React.useContext(LocationContext);

  React.useEffect(() => {
    fetchBarbers();
  }, []);

  const navigation = useNavigation();

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
            <TextInput
              style={{
                height: '100%',
                backgroundColor: COLORS.white,
                borderRadius: 10,
                padding: 10,
                paddingHorizontal: 40,
                paddingEnd: 60,
              }}
              placeholder="Search"
              onChangeText={text => {}}
            />
            <AntDesignIcons
              name="search1"
              size={20}
              color={COLORS.primary}
              style={{
                position: 'absolute',
                top: 18,
                left: 10,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                width: 54,
                height: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              onPress={() => navigation.navigate('Filters')}>
              <Image
                source={Filters}
                style={{
                  width: '100%',
                  resizeMode: 'contain',
                }}
                tintColor={COLORS.white}
              />
            </TouchableOpacity>
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
        <BottomNavigation active={'location'} />
      </View>
    </WithLoader>
  );
};

export default Map;

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
