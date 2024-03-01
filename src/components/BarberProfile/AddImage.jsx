import React from 'react';
import {Alert, Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';
import FormInput from '../shared/FormInput';
import {UploadImage} from '../../constants';
import { launchImageLibrary } from 'react-native-image-picker';

const AddImage = () => {
  const [selectedImage, setSelectedImage] = React.useState('');
  return (
    <View
      style={{
        paddingVertical: 20,
      }}>
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
                setSelectedImage(res.assets[0].base64);
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
          width: '48%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {selectedImage ? (
          <Image
            source={{uri: `data:image/png;base64,${selectedImage}`}}
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
    </View>
  );
};

export default AddImage;
