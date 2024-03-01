import AuthProvider from './auth/auth.provider';
import BarbersProvider from './barbers/barbers.provider';
import LoadingProvider from './loading/loading.provider';
import LocationProvider from './location/location.provider';

const RootProvider = ({children}) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <BarbersProvider>
          <LocationProvider>{children}</LocationProvider>
        </BarbersProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default RootProvider;
