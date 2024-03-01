import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {COLORS} from '../../theme';
import {CarousalImage} from '../../constants';
import IomIcons from 'react-native-vector-icons/Ionicons';

const Gallery = () => {
  const [images, setImages] = useState([
    CarousalImage,
    CarousalImage,
    CarousalImage,
    CarousalImage,
    CarousalImage,
  ]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <Text style={styles.heading}>
          <Text>Photos</Text>
          <Text style={{color: COLORS.primary}}> ({images.length}) </Text>
        </Text>
        <View style={styles.imagesGrid}>
          {images.map((item, index) => (
            <Image source={item} style={styles.image} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    marginBottom: '23%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    fontFamily: 'Monteserrat-Bold',
  },
  imagesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '49%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});
