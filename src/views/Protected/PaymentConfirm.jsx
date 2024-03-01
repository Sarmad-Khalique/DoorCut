import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {NotificationImage, PaymentConfirmed} from '../../constants';

const PaymentConfrm = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
          marginHorizontal: 10,
          height: '10%',
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
            opacity: 0,
          }}>
          Payment Confirmed
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
      <View style={{height: '90%'}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
          }}>
          <Image
            source={PaymentConfirmed}
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 20,
              fontWeight: '500',
              color: COLORS.textPrimary,
              textAlign: 'center',
            }}>
            Payment Successful
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 14,
              fontWeight: '400',
              color: COLORS.textSecondary,
              textAlign: 'center',
            }}>
            Your booking has been successfully done
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentConfrm;
