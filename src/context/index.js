import AuthProvider from './auth/auth.provider';
import LocationProvider from './location/location.provider';

const RootProvider = ({children}) => {
  return (
    <AuthProvider>
      <LocationProvider>{children}</LocationProvider>
    </AuthProvider>
  );
};

export default RootProvider;
