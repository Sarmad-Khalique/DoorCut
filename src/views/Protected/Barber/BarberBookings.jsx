import React, {useState} from 'react';
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
  NotificationBell,
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
import TabContainer from '../../../components/shared/TabContainer';

const BarberCard = ({
  id,
  name,
  image,
  location,
  rating,
  isCancelled,
  isUpcoming,
  isCompleted,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginRight: 25,
        width: '100%',
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
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
      {!isCancelled && !isCompleted && (
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
              {isUpcoming ? 'Add On' : 'Accept'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isCompleted && (
        <View
          style={{
            marginVertical: 10,
          }}>
          <Button>View E-Receipt</Button>
        </View>
      )}
    </View>
  );
};

const BarberBookings = () => {
  const [activeTab, setActiveTab] = useState('services');
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            opacity: 0,
          }}
          onPress={() => navigation.goBack()}>
          <AntDesignIcons name="arrowleft" size={25} color={COLORS.primary} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat',
            fontWeight: '500',
            color: COLORS.textPrimary,
          }}>
          Bookings
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('Notifications')}>
          <Image source={NotificationBell} />
        </TouchableOpacity>
      </View>
      <View>
        <TabContainer onActiveTabChange={setActiveTab} isBarber={true} />
        <ScrollView
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 16,
              fontWeight: '500',
              color: '#323943',
            }}>
            New Offers
          </Text>
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
          <BarberCard
            isCancelled={activeTab === 'Cancelled'}
            isUpcoming={activeTab === 'Ongoing'}
            isCompleted={activeTab === 'Completed'}
          />
        </ScrollView>
      </View>
      <BarberNavigation active={'bookings'} />
    </View>
  );
};

export default BarberBookings;
