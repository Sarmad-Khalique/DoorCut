import {createContext, useState} from 'react';
import api from '../../config';
import useLoading from '../../hooks/useLoading';

const INITIAL_STATE = {
  topRatedBarbers: [],
  services: [],
  days: [],
  timeSlots: [],
};

export const BarbersContext = createContext(INITIAL_STATE);

const BarbersProvider = ({children}) => {
  const [topRatedBarbers, setTopRatedBarbers] = useState([]);
  const [allBarbers, setAllBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [daysLookupMap, setDaysLookupMap] = useState({});
  const [packages, setPackages] = useState([]);
  const {setLoading} = useLoading();

  const fetchDaysLookup = async () => {
    setLoading(true);
    try {
      const response = await api.get('/lookup/lookup?type=day');
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        const lookupMap = {};
        response.data.data.forEach(day => {
          lookupMap[day.valeu] = day.lookupId;
        });
        setDaysLookupMap(lookupMap);
      }
    } catch (error) {
      console.log('Error Fetching Lookups: ', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopRatedBarbers = async () => {
    setLoading(true);

    try {
      const response = await api.post('/review/getAll/', {
        isPagination: false,
        rating: 5,
      });
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setTopRatedBarbers(response.data.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBarbers = async () => {
    setLoading(true);

    try {
      const response = await api.post('/barberProfile/getAll', {
        isPagination: false,
      });
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setAllBarbers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.post('/barberServices/getAll', {
        isPagination: false,
      });
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setServices(response.data.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await api.post('/packages/getAll', {
        isPagination: false,
      });
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setPackages(response.data.data);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchBookingDays = async ({startDate, endDate, barberId}) => {
    setLoading(true);
    await fetchDaysLookup();
    try {
      const response = await api.post(
        `/slot/getBarberSlotDates?barberId=${barberId}&startDate=${startDate}&endDate=${endDate}`,
      );
      console.log("URL: ", `/slot/getBarberSlotDates?barberId=${barberId}&startDate=${startDate}&endDate=${endDate}`)
      console.log("Response: ", response.data);
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setDays(response.data.data);
      }
    } catch (error) {
      console.log('Error Fetching Days: ', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlotsPerDay = async ({barberId, date, day}) => {
    setLoading(true);
    const dayId = daysLookupMap[day];
    console.log('dayId: ', dayId);
    try {
      const response = await api.get(
        `/slot/GetBarberSlots?barberId=${barberId}&date=${date}&dayId=${dayId}`,
      );
      if (response.data.httpStatusCode !== 200) {
        console.log(response.data.message);
      } else {
        setTimeSlots(
          response.data.data.filter(slot => slot.status === 'Available'),
        );
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const values = {
    topRatedBarbers,
    fetchTopRatedBarbers,
    fetchServices,
    services,
    fetchBarbers,
    allBarbers,
    fetchBookingDays,
    days,
    fetchSlotsPerDay,
    timeSlots,
    fetchPackages,
    packages
  };
  return (
    <BarbersContext.Provider value={values}>{children}</BarbersContext.Provider>
  );
};

export default BarbersProvider;
