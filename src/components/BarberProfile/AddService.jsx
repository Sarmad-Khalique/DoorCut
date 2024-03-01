import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';

const AddService = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <View style={{
        paddingVertical: 20
    }}>
      <TouchableOpacity
        style={{
          width: '30%',
          height: 170,
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: 'dashed',
        }}
        onPress={() => setShowModal(true)}>
        <IonIcons name="add" size={30} color={COLORS.primary} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: COLORS.textPrimary,
          }}>
          Add Service
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: COLORS.white,
              padding: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.textPrimary,
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                }}>
                Add Service
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <IonIcons name="close" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.textPrimary,
                  fontFamily: 'Montserrat-Regular',
                  textAlign: 'left',
                }}>
                Service
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddService;
