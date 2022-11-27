import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../components/Auth/firebase/firebase.js';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');
  const [currentUser, setCurrentUser] = useState('');
  const [userPhotos, setUserPhotos] = useState([])

  /** asynchronously sets current userid so it is not undefined in other modules **/
  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

 /** INSERT VARIABLE NAMES into value deconstruction to make them available in other modules */
  const value = { username, setUsername, currentUser, userPhotos, setUserPhotos};

 /** MAKES CONTEXT AVAILABLE **/
  useEffect(() => {
    if (currentUser) {
      axios.get(`https://silver-beans-smile-173-228-53-12.loca.lt/photos/${currentUser.uid}`)
        .then(res => {
          console.log('res data', res.data[0].photos);
          setUserPhotos(res.data[0].photos);
        })
        .catch(err => console.log('error', err));
    }
  }, [currentUser]);

  /** makes Context available to other modules **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
