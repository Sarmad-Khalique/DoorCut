import React from 'react';
import {AuthContext} from '../context/auth/auth.provider';

const useAuth = () => {
  const {user, setUser} = React.useContext(AuthContext);
  return {user, setUser};
};

export default useAuth;
