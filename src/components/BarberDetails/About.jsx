import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {COLORS} from '../../theme';

const About = ({aboutText}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.aboutSection}>
          <Text style={styles.headinbg}>About</Text>
          <View style={styles.cardView}>
            <Text style={styles.subHeaidng}>
              {aboutText}
            </Text>
          </View>
        </View>
        <View style={styles.workingHoursContainer}>
          <Text style={styles.headinbg}>Working Hours</Text>
          <View style={{...styles.workingHoursList, ...styles.cardView}}>
            <View style={styles.workingHours}>
              <Text style={styles.workingHoursText}>Monday</Text>
              <Text style={styles.workingHoursTimingText}>9am to 6pm</Text>
            </View>
            <View style={styles.workingHours}>
              <Text style={styles.workingHoursText}>Tuesday</Text>
              <Text style={styles.workingHoursTimingText}>9am to 6pm</Text>
            </View>
            <View style={styles.workingHours}>
              <Text style={styles.workingHoursText}>Wedsnday</Text>
              <Text style={styles.workingHoursTimingText}>9am to 6pm</Text>
            </View>
            <View style={styles.workingHours}>
              <Text style={styles.workingHoursText}>Thursday</Text>
              <Text style={styles.workingHoursTimingText}>9am to 6pm</Text>
            </View>
            <View style={styles.workingHours}>
              <Text style={styles.workingHoursText}>Friday</Text>
              <Text style={styles.workingHoursTimingText}>9am to 6pm</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    marginBottom: '20%',
  },
  aboutSection: {
    marginBottom: 20,
  },
  headinbg: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
  },
  cardView: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  subHeaidng: {
    color: COLORS.textSecondary,
    fontFamily: 'Montserrat-Regular',
  },
  workingHoursContainer: {
    marginBottom: 20,
  },
  workingHoursList: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  workingHours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  workingHoursText: {
    color: COLORS.textSecondary,
    fontFamily: 'Montserrat-Regular',
  },
  workingHoursTimingText: {
    color: COLORS.textPrimary,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
});
