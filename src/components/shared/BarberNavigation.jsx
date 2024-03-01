import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {BarberScissors, Calendar, Chat, Home, User} from '../../constants';

const BarberNavigation = ({active}) => {
  const navigation = useNavigation();
  const images = [
    {id: 1, image: Home, name: 'home', link: 'BarberHome'},
    {id: 2, image: Calendar, name: 'bookings', link: 'BarberBookings'},
    {id: 3, image: BarberScissors, name: 'services', link: 'BarberHome'},
    {id: 4, image: Chat, name: 'chat', link: 'Chat'},
    {id: 5, image: User, name: 'user', link: 'ProfileSettings'},
  ];
  return (
    <View style={styles.bottomNavigation}>
      {images.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.link);
              }}>
              <Image
                source={item.image}
                tintColor={
                  active === item.name ? COLORS.primary : COLORS.textPrimary
                }
              />
            </TouchableOpacity>
            {active === item.name && (
              <View
                style={{
                  position: 'absolute',
                  opacity: 0.2,
                  backgroundColor: COLORS.primary,
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  top: '50%',
                  left: '50%',
                  transform: [{translateX: -25}, {translateY: -25}],
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default BarberNavigation;

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
});
