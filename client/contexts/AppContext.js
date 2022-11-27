import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');

  const value = { username, setUsername };

  useEffect(() => {
    axios.get('https://thick-hoops-warn-99-227-192-34.loca.lt/photos/VwyMkBrrLsP047lPEfWqXAIKdDk1')
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
