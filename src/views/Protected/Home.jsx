import React, {useEffect} from 'react';
import {
  Alert,
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
import {CarousalImage, Filters, NotificationBell} from '../../constants';
import PackageCard from '../../components/shared/PackagesCard';
import {BarbersContext} from '../../context/barbers/barbers.provider';
import WithLoader from '../../components/HOC/WithLoader';
import {useNavigation} from '@react-navigation/native';
import {LocationContext} from '../../context/location/location.provider';
import Geolocation from '@react-native-community/geolocation';
import useLoading from '../../hooks/useLoading';
import {AuthContext} from '../../context/auth/auth.provider';

const Service = ({name, image}) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 25,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 70,
          height: 70,
          backgroundColor: COLORS.white,
          borderRadius: 35,
        }}>
        <Image
          source={{
            uri: `data:image/png;base64,${image}`,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            resizeMode: 'contain',
          }}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          color: COLORS.textPrimary,
          fontSize: 12,
          fontFamily: 'Montserrat',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const BarberCard = ({name, image, location, rating}) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 25,
        width: 230,
        height: 80,
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
      }}>
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
            justifyContent: 'center',
            alignItems: 'flex-start',
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

const Home = () => {
  const {
    fetchServices,
    services,
    fetchTopRatedBarbers,
    topRatedBarbers: barbers,
    fetchPackages,
    packages,
  } = React.useContext(BarbersContext);
  const {location, setLocation} = React.useContext(LocationContext);

  const {setLoading} = useLoading();
  const {getClientProfile} = React.useContext(AuthContext);

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
          },
          error => {
            setLoading(false);
            console.log('Error: ', error);
            Alert.alert('Error', 'Failed to get location', [
              {
                text: 'Retry',
                onPress: () => requestAuthorization(),
              },
              {
                text: 'Cancel',
                onPress: () => {},
              },
            ]);
          },
          {enableHighAccuracy: true},
        );
      },
      err => {
        setLoading(false);
        console.log('Err ', err);
        Alert.alert('Error', 'Failed to get location', [
          {
            text: 'Retry',
            onPress: () => requestAuthorization(),
          },
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
          },
        ]);
      },
    );
  };

  useEffect(() => {
    requestAuthorization();
    fetchServices();
    fetchTopRatedBarbers();
    fetchPackages();
    getClientProfile();
  }, []);

  const navigation = useNavigation();

  return (
    <WithLoader>
      <View style={styles.container}>
        <ScrollView style={styles.mainContent}>
          <View style={styles.header}>
            <View style={styles.alignRight}>
              <Text
                style={{
                  textAlign: 'left',
                  marginHorizontal: 5,
                  marginBottom: 5,
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                Location
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IonIcons
                  name="location-sharp"
                  size={24}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: COLORS.textPrimary,
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  {`${location?.latitude?.toFixed(
                    2,
                  )}, ${location?.longitude.toFixed(2)}`}
                </Text>
                <IonIcons
                  name="chevron-down-outline"
                  size={24}
                  color={COLORS.black}
                />
              </View>
            </View>
            <View style={styles.alignLeft}>
              <TouchableOpacity
                style={styles.notificationBell}
                onPress={() => navigation.navigate('Notifications')}>
                <Image source={NotificationBell} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.search}>
            <View style={{width: '80%'}}>
              <TextInput
                style={{
                  height: '100%',
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  padding: 10,
                  paddingStart: 40,
                  width: '100%',
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
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                width: 54,
                height: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
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
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              fontFamily: 'Montserrat-Bold',
              color: COLORS.textPrimary,
              marginVertical: 20,
            }}>
            #SpecialForYou
          </Text>
          <View style={styles.imageCarousal}>
            <Image source={CarousalImage} style={styles.imageCarousal} />
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 20,
              }}
            />
            <Text
              style={{
                width: '75%',
                color: COLORS.white,
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'Montserrat-Bold',
                position: 'absolute',
                top: 10,
                left: 20,
              }}>
              Best hairdresser in your town
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.offWhite,
                borderRadius: 10,
                padding: 8,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 15,
                left: 20,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  color: COLORS.textPrimary,
                }}>
                Services
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat',
                  color: COLORS.primary,
                }}>
                See All
              </Text>
            </View>
            <FlatList
              data={services}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Service name={item.serviceName} image={item.serviceImage} />
              )}
            />
          </View>

          <View style={styles.topRatedContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  color: COLORS.textPrimary,
                }}>
                Top Rated Barbers
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Montserrat',
                    color: COLORS.primary,
                  }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={barbers}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <BarberCard
                  name={item.barberName}
                  image={CarousalImage}
                  location={'Portland, USA'}
                  rating={item.rating}
                  id={item.barberId}
                />
              )}
            />
          </View>

          <View style={styles.packagesContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat-Bold',
                  color: COLORS.textPrimary,
                }}>
                Packages & Offers
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat',
                  color: COLORS.primary,
                }}>
                See All
              </Text>
            </View>
            <FlatList
              data={packages}
              horizontal
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <PackageCard
                  name={item.name}
                  image={CarousalImage}
                  distance={2.1}
                  rating={5}
                  basePrice={item.price}
                  discountPrice={item.discountedPrice}
                />
              )}
            />
          </View>
        </ScrollView>
        <BottomNavigation active={'home'} />
      </View>
    </WithLoader>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    marginBottom: 74,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  alignRight: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  notificationBell: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    width: '100%',
    height: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCarousal: {
    width: '100%',
    height: 166,
    borderRadius: 20,
    marginBottom: 20,
  },
  topRatedContainer: {
    marginVertical: 20,
  },
  packagesContainer: {
    marginVertical: 20,
  },
});
