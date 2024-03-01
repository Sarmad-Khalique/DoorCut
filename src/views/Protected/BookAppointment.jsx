import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../theme';
import {CarousalImage} from '../../constants';
import Button from '../../components/shared/Button';
import {useNavigation} from '@react-navigation/native';
import useGetBarberById from '../../hooks/useGetBarberById';
import {BarbersContext} from '../../context/barbers/barbers.provider';

const ServiceCard = ({
  title,
  image,
  description,
  price,
  isSelected,
  onChooseService,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 120,
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginVertical: 10,
      }}
      onPress={onChooseService}>
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
          }}>
          <Image
            source={image}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
          {isSelected && (
            <View
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
              }}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: COLORS.primary,
                  width: '100%',
                  height: '100%',
                  opacity: 0.3,
                }}
              />
              <AntDesignIcons
                name="check"
                size={30}
                color={COLORS.white}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: [{translateX: -15}, {translateY: -15}],
                }}
              />
            </View>
          )}
          <View>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 14,
                color: COLORS.textPrimary,
                marginStart: 10,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: COLORS.textPrimary,
                marginStart: 10,
                fontWeight: '300',
              }}>
              {description}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat-Bold',
            color: COLORS.textPrimary,
            fontWeight: 'bold',
          }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const BookAppointment = ({route}) => {
  const {id} = route.params;
  const barber = useGetBarberById({
    id,
  });
  const [selectedDate, setSelectedDate] = React.useState(null);

  const {fetchBookingDays, days} = React.useContext(BarbersContext);

  React.useEffect(() => {
    fetchBookingDays({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      barberId: id,
    });
  }, [id]);

  const navigation = useNavigation();
  const [totalPeople, setTotalPeople] = React.useState(1);
  const [selectedService, setSelectedService] = React.useState(null);
  console.log('days', days);
  return (
    <View style={styles.container}>
      <Image
        source={CarousalImage}
        style={{
          width: '100%',
          height: '30%',
        }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '10%',
          left: 10,
          zIndex: 1,
          backgroundColor: COLORS.white,
          padding: 8,
          borderRadius: 20,
        }}
        onPress={() => navigation.goBack()}>
        <AntDesignIcons name="arrowleft" size={25} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '10%',
          right: 10,
          zIndex: 1,
          backgroundColor: COLORS.white,
          padding: 8,
          borderRadius: 20,
        }}
        onPress={() => navigation.navigate('Chat')}>
        <IonIcons name="chatbox-outline" size={25} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.mainContent}>
        <Image
          source={CarousalImage}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            position: 'absolute',
            left: '50%',
            top: -50,
            transform: [{translateX: -50}],
            borderWidth: 5,
            borderColor: COLORS.white,
          }}
        />
        <Text style={styles.barberName}>Barber Name</Text>
        <Text style={styles.subHeading}>
          Hair cut, Make up, Shaving,Massage
        </Text>
        <View style={styles.center}>
          <View style={styles.center}>
            <IonIcons name="star" size={20} color={COLORS.yellow} />
            <Text style={styles.rating}>4.5</Text>
          </View>
          <Text style={styles.reviews}>(1k+ Reviews)</Text>
        </View>
        <ScrollView
          style={{
            marginBottom: '25%',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '600',
              }}>
              Total People
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                padding: 5,
                borderRadius: 20,
              }}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => {
                  if (totalPeople > 1) {
                    setTotalPeople(totalPeople - 1);
                  }
                }}>
                <AntDesignIcons
                  name="minus"
                  size={18}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  fontFamily: 'Montserrat-Bold',
                  marginHorizontal: 10,
                  textAlign: 'center',
                  backgroundColor: COLORS.white,
                }}>
                {totalPeople}
              </Text>
              <TouchableOpacity
                style={{
                  padding: 5,
                  backgroundColor: COLORS.white,
                }}
                onPress={() => {
                  setTotalPeople(totalPeople + 1);
                }}>
                <AntDesignIcons name="plus" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '600',
              }}>
              Service
            </Text>
            {barber?.barberServiceResponseDTOs?.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.serviceName}
                image={service.image || CarousalImage}
                description={service.description}
                price={service.price}
                isSelected={selectedService === service.id}
                onChooseService={() => {
                  setSelectedService(service.id);
                }}
              />
            ))}
          </View>
          <View>
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '600',
              }}>
              Address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: COLORS.white,
                padding: 10,
                borderRadius: 10,
              }}>
              <IonIcons
                name="location-sharp"
                size={20}
                color={COLORS.primary}
              />
              <Text>123, Street Name, City, Country</Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.textPrimary,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                fontWeight: '600',
                marginBottom: 5,
              }}>
              Day
            </Text>
            <FlatList
              data={days}
              horizontal
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    width: 67,
                    borderRadius: 10,
                    backgroundColor:
                      selectedDate === item ? COLORS.primary : COLORS.white,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 2,
                    marginEnd: 5,
                  }}
                  onPress={() => setSelectedDate(item)}>
                  <Text
                    style={{
                      color:
                        selectedDate === item
                          ? COLORS.white
                          : COLORS.textPrimary,
                      fontFamily: 'Montserrat',
                      fontSize: 12,
                      fontWeight: '500',
                    }}>
                    {new Date(item).toDateString().split(' ')[1]}
                  </Text>
                  <Text
                    style={{
                      color:
                        selectedDate === item
                          ? COLORS.white
                          : COLORS.textPrimary,
                      fontFamily: 'Montserrat',
                      fontSize: 32,
                      fontWeight: '500',
                    }}>
                    {new Date(item).toDateString().split(' ')[2]}
                  </Text>
                  <Text
                    style={{
                      color:
                        selectedDate === item
                          ? COLORS.white
                          : COLORS.textPrimary,
                      fontFamily: 'Montserrat',
                      fontSize: 12,
                      fontWeight: '500',
                    }}>
                    {new Date(item).toDateString().split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button onClick={() => navigation.navigate('PaymentMethod')}>
            Proceed to Payment
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    backgroundColor: COLORS.gray,
    width: '100%',
    height: '75%',
    position: 'absolute',
    top: '25%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  barberName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginTop: 45,
  },
  subHeading: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    color: COLORS.black,
    fontSize: 14,
    marginStart: 5,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  reviews: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
    marginStart: 5,
  },
  buttonView: {
    width: '100%',
    height: '15%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});
