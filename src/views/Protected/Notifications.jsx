import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {NotificationImage} from '../../constants';

const NotificationCard = ({title, description, time}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: '70%',
          }}>
          <Image
            source={NotificationImage}
            style={{
              width: 52,
              height: 52,
              borderRadius: 20,
              marginEnd: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.textPrimary,
                fontFamily: 'Montserrat',
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: COLORS.textSecondary,
                fontFamily: 'Montserrat-Regular',
              }}>
              {description}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: COLORS.textSecondary,
            fontFamily: 'Montserrat-Regular',
          }}>
          {time}
        </Text>
      </View>
    </View>
  );
};

const Notifications = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      title: 'New Message',
      description: 'You have a new message from Alex',
      time: '19 Jan',
    },
    {
      title: 'New Order',
      description: 'You have received a new order from Alex',
      time: '19 Jan',
    },
    {
      title: 'New Message',
      description: 'You have a new message from Bob',
      time: '19 Jan',
    },
    {
      title: 'New Order',
      description: 'You have received a new order from Poppy',
      time: '19 Jan',
    },
  ];

  return (
    <View style={{flex: 1}}>
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
          Notifications
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            opacity: 0,
          }}
          onPress={() => navigation.goBack()}>
          <IonIcons
            name="notifications-outline"
            size={25}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={notifications}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <NotificationCard
              title={item.title}
              description={item.description}
              time={item.time}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Notifications;
