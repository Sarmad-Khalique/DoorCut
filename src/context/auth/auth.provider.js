import {createContext, useContext, useState} from 'react';
import {LoadingContext} from '../loading/loading.provider';
import {Alert} from 'react-native';
import api from '../../config';

const INITIAL_STATE = {
  user: null,
  selectedRole: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const {setLoading} = useContext(LoadingContext);

  const getClientProfile = async userId => {
    setLoading(true);
    try {
      const res = await api.post('/clientProfile/getAll', {
        userId,
        isPagination: false,
      });
      if (res.data.httpStatusCode !== 200) {
        Alert.alert('Error', res.data.message);
        return;
      }
      const {phoneNumber, image, address, genderId, latitude, longitude} =
        res.data.data[0];
      setUser({
        ...user,
        phoneNumber,
        image,
        address,
        genderId,
        latitude,
        longitude,
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const values = {
    user,
    setSelectedRole,
    selectedRole,
    setUser,
    getClientProfile,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
