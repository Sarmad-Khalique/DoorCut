import React from 'react';
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
import {COLORS} from '../../theme';
import {CarousalImage} from '../../constants';
import TabContainer from '../../components/shared/TabContainer';
import About from '../../components/BarberDetails/About';
import Button from '../../components/shared/Button';
import Reviews from '../../components/BarberDetails/Reviews';
import Gallery from '../../components/BarberDetails/Gallery';
import Packages from '../../components/BarberDetails/Packages';
import Services from '../../components/BarberDetails/Services';
import {useNavigation} from '@react-navigation/native';
import useGetBarberById from '../../hooks/useGetBarberById';
import WithLoader from '../../components/HOC/WithLoader';

const BarberDetails = ({route}) => {
  const {barberId} = route.params;
  const [activeTab, setActiveTab] = React.useState('Services');
  const barber = useGetBarberById({
    id: barberId,
  });
  const navigation = useNavigation();
  return (
    <WithLoader>
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
          }}>
          <AntDesignIcons
            name="arrowleft"
            size={25}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
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
          onPress={() =>
            navigation.navigate('Chat', {
              conversation_id: `${barber?.name}_${barber?.userId}`,
              barber_image: CarousalImage,
              barber_name: barber?.name,
            })
          }>
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
          <Text style={styles.barberName}>{barber?.name}</Text>
          <Text style={styles.subHeading}>
            Hair cut, Make up, Shaving,Massage
          </Text>
          <View style={styles.center}>
            <View style={styles.center}>
              <IonIcons name="star" size={20} color={COLORS.yellow} />
              <Text style={styles.rating}>{barber?.averageReview}</Text>
            </View>
            <Text style={styles.reviews}>({barber?.totalReviews} Reviews)</Text>
          </View>
          <TabContainer onActiveTabChange={setActiveTab} />
          {activeTab === 'Services' ? (
            <Services services={barber?.barberServiceResponseDTOs} />
          ) : activeTab === 'Packages' ? (
            <Packages packages={barber?.packageResponseDTOs} />
          ) : activeTab === 'Gallery' ? (
            <Gallery />
          ) : activeTab === 'Review' ? (
            <Reviews reviews={barber?.reviewResponseDTOs} />
          ) : activeTab === 'About' ? (
            <About aboutText={barber?.aboutYou} />
          ) : null}
          <View style={styles.buttonView}>
            <Button
              onClick={() =>
                navigation.navigate('Appointment', {id: barberId})
              }>
              Book Appointment
            </Button>
          </View>
        </View>
      </View>
    </WithLoader>
  );
};

export default BarberDetails;

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
