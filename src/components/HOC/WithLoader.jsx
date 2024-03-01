import React from 'react';
import useLoading from '../../hooks/useLoading';
import Loader from '../shared/Loader';
import {View} from 'react-native';

const WithLoader = ({children}) => {
  const {loading} = useLoading();
  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
      {children}
    </View>
  );
};

export default WithLoader;
