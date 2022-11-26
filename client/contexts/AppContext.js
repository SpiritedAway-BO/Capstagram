import { createContext, useState, useEffect } from 'react';
import { auth } from '../components/Auth/firebase/firebase.js';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');
  const [currentUser, setCurrentUser] = useState(auth.currentUser);


 /** insert variable names into value deconstruction to make them available in other modules */
  const value = { username, setUsername, currentUser };


 /** makes Context available to other modules **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
