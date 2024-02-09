import {createContext} from 'react';

const INITIAL_STATE = {
  user: null,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const values = {
    user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
