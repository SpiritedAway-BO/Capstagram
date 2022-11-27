import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../components/Auth/firebase/firebase.js';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');
  const [currentUser, setCurrentUser] = useState(auth.currentUser);


  useEffect(() => {
    axios.get('https://thick-hoops-warn-99-227-192-34.loca.lt/photos/VwyMkBrrLsP047lPEfWqXAIKdDk1')
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  /** insert variable names into value deconstruction to make them available in other modules */
  const value = { username, setUsername, currentUser };


  /** makes Context available to other modules **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
