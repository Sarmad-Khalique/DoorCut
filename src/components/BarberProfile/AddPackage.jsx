import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';
import FormInput from '../shared/FormInput';
import Button from '../shared/Button';
import {BarbersContext} from '../../context/barbers/barbers.provider';

const AddPackage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [servicesData, setServicesData] = React.useState([]);
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [packageName, setPackageName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');

  const {fetchServices, services} = React.useContext(BarbersContext);

  React.useEffect(() => {
    fetchServices();
  }, []);

  React.useEffect(() => {
    if (services) {
      setServicesData(
        services.map(service => ({
          value: service.serviceName,
          key: service.id,
        })),
      );
    }
  }, [services]);

  console.log('Services ', services);

  return (
    <View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 120,
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
          Create Pakage
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
              maxHeight: '80%',
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
                Create Package
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <IonIcons name="close" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <FormInput
                type="imagePicker"
                value={image}
                onChangeText={val => setImage(val)}
              />
              <FormInput
                label="Package Name"
                placeholder="Package Name"
                value={packageName}
                onChangeText={val => setPackageName(val)}
              />
              <FormInput
                label="Select Service"
                type="multiselect"
                data={servicesData}
                setSelected={val => setSelectedServices(val)}
              />
              <FormInput
                label="Price"
                placeholder="Select Price"
                value={price}
                onChangeText={val => setPrice(val)}
              />
              <FormInput
                label="Description"
                placeholder="Enter Here"
                value={description}
                onChangeText={val => setDescription(val)}
                type="textArea"
              />
              <Button>Add</Button>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddPackage;
