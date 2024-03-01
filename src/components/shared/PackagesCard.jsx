import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme';
import IonIcons from 'react-native-vector-icons/Ionicons';

const PackageCard = ({
  name,
  image,
  distance,
  rating,
  basePrice,
  discountPrice,
  isVertical = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: isVertical ? 0 : 10,
        width: isVertical ? '100%' : 280,
        height: isVertical ? 270 : 'auto',
        backgroundColor: COLORS.white,
        marginVertical: isVertical ? 10 : 0,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={image}
          style={{
            width: isVertical ? '100%' : 260,
            height: isVertical ? 200 : 170,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Montserrat-Bold',
              color: COLORS.textPrimary,
              fontWeight: 'bold',
              marginVertical: 5,
            }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IonIcons name="star" size={14} color={COLORS.yellow} />
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <IonIcons
                  name="location-sharp"
                  size={14}
                  color={COLORS.primary}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Montserrat',
                    color: COLORS.textPrimary,
                    marginHorizontal: 2,
                  }}>
                  {distance} km
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Montserrat',
                  color: COLORS.textSecondary,
                  textDecorationLine: 'line-through',
                }}>
                ${basePrice}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginHorizontal: 5,
                }}>
                ${discountPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PackageCard;
