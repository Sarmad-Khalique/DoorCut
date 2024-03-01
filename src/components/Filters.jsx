import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../theme';
import {Apple, Paypal} from '../constants';

const Filters = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  return (
    <View
      style={{
        flex: 1,
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
          Filters
        </Text>
        <Text
          style={{
            opacity: 0,
          }}>
          Payment
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected === 'male' ? COLORS.primary : COLORS.white,
            borderRadius: 25,
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginEnd: 10,
          }}
          onPress={() => setSelected('male')}>
          <Text
            style={{
              color: selected === 'male' ? COLORS.white : COLORS.textPrimary,
              fontFamily: 'Montserrat',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected === 'female' ? COLORS.primary : COLORS.white,
            borderRadius: 25,
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginEnd: 10,
          }}
          onPress={() => setSelected('female')}>
          <Text
            style={{
              color: selected === 'female' ? COLORS.white : COLORS.textPrimary,
              fontFamily: 'Montserrat',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filters;
