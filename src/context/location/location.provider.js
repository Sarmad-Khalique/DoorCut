import {createContext, useState} from 'react';

const INITIAL_STATE = {
  location: null,
};

export const LocationContext = createContext(INITIAL_STATE);

const LocationProvider = ({children}) => {
  const [location, setLocation] = useState(null);

  const values = {
    location,
    setLocation
  };
  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
