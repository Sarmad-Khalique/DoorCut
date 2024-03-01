import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';
import FormInput from '../shared/FormInput';

const AddAccount = () => {
  const [selectedBank, setSelectedBank] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  return (
    <View
      style={{
        paddingVertical: 20,
      }}>
      <FormInput
        type="select"
        label="Select Bank"
        data={[
          {key: 'Bank 1', value: 'bank1'},
          {key: 'Bank 2', value: 'bank2'},
          {key: 'Bank 3', value: 'bank3'},
        ]}
        save="value"
        value={selectedBank}
        onChangeText={val => setSelectedBank(val)}
      />
      <FormInput
        label="Account Number"
        placeholder="123-456-789"
        value={accountNumber}
        onChangeText={val => setAccountNumber(val)}
      />
    </View>
  );
};

export default AddAccount;
