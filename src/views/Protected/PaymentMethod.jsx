import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';
import {Apple, Paypal} from '../../constants';

const PaymentMethod = () => {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState(null);

  useEffect(() => {
    if (selectedPaymentMethod) {
      Alert.alert('Payment Method', selectedPaymentMethod, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('PaymentConfirm');
          },
        },
      ]);
    }
  }, [selectedPaymentMethod]);

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
          Payment Method
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
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Montserrat',
              fontWeight: '500',
              color: COLORS.textPrimary,
              marginBottom: 10,
            }}>
            Credit & Debit Card
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AntDesignIcons
                name="creditcard"
                size={25}
                color={COLORS.primary}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat',
                  fontWeight: '500',
                  color: COLORS.textSecondary,
                }}>
                Add new Card
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => setSelectedPaymentMethod('card')}>
              {selectedPaymentMethod === 'card' && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Montserrat',
              fontWeight: '500',
              color: COLORS.textPrimary,
              marginBottom: 10,
            }}>
            More Payment Options
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Paypal}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat',
                  fontWeight: '500',
                  color: COLORS.textSecondary,
                }}>
                Paypal
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => setSelectedPaymentMethod('paypal')}>
              {selectedPaymentMethod === 'paypal' && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Apple}
                style={{
                  marginHorizontal: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat',
                  fontWeight: '500',
                  color: COLORS.textSecondary,
                }}>
                Apple Pay
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => setSelectedPaymentMethod('apple')}>
              {selectedPaymentMethod === 'apple' && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;
