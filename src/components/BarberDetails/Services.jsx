import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../theme';
import {CarousalImage} from '../../constants';

const ServiceCard = ({name, image, price}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 100,
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
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
          }}>
          <Image
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
            }}
            source={image || CarousalImage}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: COLORS.textPrimary,
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
            }}>
            {name}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.textPrimary,
            fontSize: 20,
            fontWeight: '500',
          }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Services = ({services}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>
          <Text>Services</Text>
          <Text style={{color: COLORS.primary}}> ({services?.length}) </Text>
        </Text>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {services?.map((item, index) => (
              <ServiceCard
                key={index}
                name={item.serviceName}
                image={item.image}
                price={item.price}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    marginBottom: '25%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    fontFamily: 'Monteserrat-Bold',
  },
});
