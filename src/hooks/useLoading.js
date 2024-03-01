import {useContext} from 'react';
import {LoadingContext} from '../context/loading/loading.provider';

const useLoading = () => {
  const {loading, setLoading} = useContext(LoadingContext);
  return {loading, setLoading};
};

export default useLoading;
