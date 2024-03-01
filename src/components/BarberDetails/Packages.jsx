import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../theme';
import {CarousalImage} from '../../constants';
import IomIcons from 'react-native-vector-icons/Ionicons';
import PackageCard from '../shared/PackagesCard';

const Packages = ({packages}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>
          <Text>Packages</Text>
          <Text style={{color: COLORS.primary}}> ({packages?.length}) </Text>
        </Text>
        <FlatList
          data={packages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PackageCard
              name={item.name}
              image={CarousalImage}
              distance={2.1}
              rating={4.5}
              basePrice={item.price}
              discountPrice={item.discountedPrice}
              isVertical
            />
          )}
        />
      </View>
    </View>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    marginBottom: '30%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    fontFamily: 'Monteserrat-Bold',
  },
});
