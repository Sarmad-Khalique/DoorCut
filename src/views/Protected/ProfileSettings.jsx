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
import {
  ArrowLeftPrimary,
  ArrowLeftSecondary,
  ArrowRightPrimary,
  BarberScissors,
  CarousalImage,
  Language,
  Logout,
  NotificationBell,
  Payments,
  User,
} from '../../constants';
import PackageCard from '../../components/shared/PackagesCard';
import {BarbersContext} from '../../context/barbers/barbers.provider';
import WithLoader from '../../components/HOC/WithLoader';
import {useNavigation} from '@react-navigation/native';
import {LocationContext} from '../../context/location/location.provider';
import Geolocation from '@react-native-community/geolocation';
import useLoading from '../../hooks/useLoading';
import {AuthContext} from '../../context/auth/auth.provider';

const SettingOptionCard = ({image, name, link}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Image
        style={{
          width: 20,
          marginEnd: 10,
          resizeMode: 'contain',
        }}
        tintColor={COLORS.primary}
        source={image}
      />
      <Text
        style={{
          color: COLORS.textPrimary,
          fontFamily: 'Montserrat',
          fontWeight: '500',
          fontSize: 16,
        }}>
        {name}
      </Text>
      {name !== 'Logout' && (
        <View
          style={{
            position: 'absolute',
            right: 5,
          }}>
          <AntDesignIcons name="arrowright" size={25} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

const ProfileSettings = () => {
  const {setLoading} = useLoading();
  const {location, setLocation} = React.useContext(LocationContext);
  const {getClientProfile, user} = React.useContext(AuthContext);

  useEffect(() => {
    getClientProfile();
  }, []);

  const navigation = useNavigation();

  const settings = [
    {
      id: 1,
      name: 'Edit Profile',
      image: User,
      link: 'EditProfile',
    },
    {
      id: 2,
      name: 'Payment History',
      image: Payments,
      link: 'Payments',
    },
    {
      id: 3,
      name: 'Language',
      image: Language,
      link: 'Language',
    },
    {
      id: 4,
      name: 'Become a Barber',
      image: BarberScissors,
      link: 'Logout',
    },
    {
      id: 5,
      name: 'Logout',
      image: Logout,
      link: 'Logout',
    },
  ];

  return (
    <WithLoader>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <Image
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginEnd: 10,
              }}
              source={CarousalImage}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    marginEnd: 5,
                    color: COLORS.white,
                    fontFamily: 'Montserrat',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  {user?.user?.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    fontSize: 12,
                  }}>
                  (Logged in as {user?.clientId ? 'client' : 'barber'})
                </Text>
              </View>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: 'Montserrat',
                  fontWeight: '400',
                  fontSize: 12,
                }}>
                {user?.user?.email}
              </Text>
            </View>
          </View>
          <FlatList
            data={settings}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.link === 'Logout') {
                    Alert.alert('Logout', 'Are you sure you want to logout?', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          navigation.navigate('Login');
                        },
                      },
                    ]);
                  } else {
                    navigation.navigate(item.link);
                  }
                }}>
                <SettingOptionCard
                  name={item.name}
                  image={item.image}
                  link={item.link}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <BottomNavigation active={'user'} />
      </View>
    </WithLoader>
  );
};

export default ProfileSettings;

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
