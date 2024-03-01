import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../theme';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import PhoneInput from 'react-native-phone-input';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Textarea from 'react-native-textarea';
import {launchImageLibrary} from 'react-native-image-picker';
import {UploadImage} from '../../../constants';

const FormInput = React.forwardRef(({label, ...props}, ref) => {
  const {type, data} = props;
  const [show, setShow] = React.useState(false);
  console.log('Props ', props.data);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {type === 'select' ? (
        <SelectList data={data} save="value" {...props} />
      ) : type === 'multiselect' ? (
        <MultipleSelectList data={data} save="key" {...props} />
      ) : type === 'phone' ? (
        <PhoneInput style={styles.input} ref={ref} {...props} />
      ) : type === 'password' ? (
        <View>
          <TextInput style={styles.input} {...props} secureTextEntry={!show} />
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              position: 'absolute',
              right: 10,
              top: 15,
            }}>
            <FeatherIcons
              name={show ? 'eye' : 'eye-off'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>
      ) : type === 'textArea' ? (
        <Textarea
          containerStyle={styles.input}
          onChangeText={props.onChangeText}
          value={props.value}
          maxLength={200}
          placeholder={'Enter here...'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />
      ) : type === 'imagePicker' ? (
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary(
              {mediaType: 'photo', includeBase64: true, quality: 0.5},
              res => {
                if (res.didCancel) {
                  console.log('User cancelled image picker');
                } else if (res.error) {
                  Alert.alert('Error while picking image', res.error);
                } else {
                  props.onChangeText(res.assets[0].base64);
                }
              },
            );
          }}
          style={{
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderStyle: 'dashed',
            borderRadius: 10,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.value ? (
            <Image
              source={{uri: `data:image/png;base64,${props.value}`}}
              style={{width: '100%', height: '100%', borderRadius: 10}}
            />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={UploadImage} />
              <Text>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TextInput style={styles.input} {...props} />
      )}
    </View>
  );
});

export default FormInput;
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    color: COLORS.textPrimary,
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.textTertiary,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
