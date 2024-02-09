import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/shared/Button';
import {COLORS} from '../../theme';
import {Barber, ClientActive, BarberActive, Client} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const RoleSelection = () => {
  const [role, setRole] = useState('client');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.heading}>Who you are</Text>
          <Text style={styles.subHeading}>
            Select as who you want to use app
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setRole('client')}
          style={role === 'client' ? styles.roleCardActive : styles.roleCard}>
          <View>
            <Text
              style={
                role === 'client'
                  ? styles.cardSecodaryText
                  : {...styles.cardSecodaryText, color: COLORS.textTertiary}
              }>
              I'm
            </Text>
            <Text
              style={
                role === 'client'
                  ? styles.cardPrimaryText
                  : {...styles.cardPrimaryText, color: COLORS.textTertiary}
              }>
              Client
            </Text>
          </View>
          <Image
            source={role === 'client' ? ClientActive : Client}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setRole('barber')}
          style={role === 'barber' ? styles.roleCardActive : styles.roleCard}>
          <View>
            <Text
              style={
                role === 'barber'
                  ? styles.cardSecodaryText
                  : {...styles.cardSecodaryText, color: COLORS.textTertiary}
              }>
              I'm
            </Text>
            <Text
              style={
                role === 'barber'
                  ? styles.cardPrimaryText
                  : {...styles.cardPrimaryText, color: COLORS.textTertiary}
              }>
              Barber
            </Text>
          </View>
          <Image
            source={role === 'barber' ? BarberActive : Barber}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <Button onClick={() => navigation.navigate('Login')}>Continue</Button>
      </View>
    </View>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
  },
  header: {
    marginTop: 50,
    marginBottom: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    lineHeight: 34,
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'left',
    lineHeight: 24,
  },
  buttonView: {
    width: '100%',
    height: '10%',
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
  roleCard: {
    width: '100%',
    backgroundColor: COLORS.graySecondary,
    padding: 20,
    height: '20%',
    marginVertical: 30,
    borderRadius: 20,
  },
  roleCardActive: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 20,
    height: '20%',
    marginVertical: 30,
    borderRadius: 20,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  cardPrimaryText: {
    fontSize: 32,
    color: COLORS.primary,
    textAlign: 'left',
    fontFamily: 'Montserrat',
    lineHeight: 38,
  },
  cardSecodaryText: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'left',
    fontFamily: 'Montserrat',
    lineHeight: 17,
  },
  active: {
    backgroundColor: COLORS.primary,
  },
});
