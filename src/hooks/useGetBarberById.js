import React from 'react';
import {BarbersContext} from '../context/barbers/barbers.provider';
import useLoading from './useLoading';

const useGetBarberById = ({id}) => {
  const {allBarbers: barbers} = React.useContext(BarbersContext);
  const [barber, setBarber] = React.useState(null);
  const {setLoading} = useLoading();

  React.useEffect(() => {
    setLoading(true);
    if (barbers.length) {
      const foundBarber = barbers.find(barber => barber.id === id);
      setBarber(foundBarber);
    }
    setLoading(false);
  }, [barbers]);

  return barber;
};

export default useGetBarberById;
