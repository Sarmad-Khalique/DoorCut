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

const Reviews = ({reviews}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>
          <Text>Reviews</Text>
          <Text style={{color: COLORS.primary}}> ({reviews?.length}) </Text>
        </Text>
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.reviewCard}>
              <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                  <Image
                    source={item.image || CarousalImage}
                    style={styles.userImage}
                  />
                  <View style={styles.col}>
                    <Text style={styles.userName}>{item.clientName}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
                <View style={styles.ratings}>
                  <IomIcons name="star" size={16} color={COLORS.yellow} />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <Text style={styles.reviewText}>{item.reviewDetail}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Reviews;

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
  reviewCard: {
    backgroundColor: COLORS.white,
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  col: {
    marginLeft: 10,
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  time: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
});
