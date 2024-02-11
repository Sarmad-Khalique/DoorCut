import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FormInput from '../../../components/shared/FormInput';
import {COLORS} from '../../../theme';
import Button from '../../../components/shared/Button';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftSecondary} from '../../../constants';
import {LocationContext} from '../../../context/location/location.provider';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcons from 'react-native-vector-icons/Feather';

const CompleteProfile = () => {
  const {location, setLocation} = useContext(LocationContext);
  const [place, setPlace] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Image source={ArrowLeftSecondary} />
      </TouchableOpacity>
      <Text style={styles.heading}>Complete Your Profile</Text>
      {/* TextInput with a search icon at start and cancel icon at end */}
      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            paddingHorizontal: 40,
          }}
          placeholder="Search"
          onChangeText={text => setPlace(text)}
          value={place}
        />
        <AntDesignIcons
          name="search1"
          size={20}
          color={COLORS.textSecondary}
          style={styles.icon}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 30, right: 10}}
          onPress={() => setPlace('')}>
          <FeatherIcons name="x-circle" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  heading: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
});
