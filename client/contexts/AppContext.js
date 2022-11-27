import { createContext, useState, useEffect } from 'react';
import { auth } from '../components/Auth/firebase/firebase.js';
import axios from 'axios';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');
  const [currentUser, setCurrentUser] = useState('');
  const [userPhotos, setUserPhotos] = useState([])

  /** asynchronously sets current userid so it is not undefined in other modules **/
  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  /** gets currentUser Object **/
  useEffect(() => {
    // console.log(currentUser);
    if (currentUser) {
      console.log('currentUser.uid', currentUser.uid)
      axios.get('https://full-carrots-add-173-228-53-12.loca.lt/photos', {params: {firebaseID: currentUser.uid}})
        .then((results) => {
          if (results.length > 0) {
            // setUserPhotos(results.data);
            console.log('results', results);
          }
        })
        .catch(err => console.log('error in AppContext'))
    }
  }, [currentUser]);


 /** INSERT VARIABLE NAMES into value deconstruction to make them available in other modules */
  const value = { username, setUsername, currentUser, userPhotos, setUserPhotos};


 /** MAKES CONTEXT AVAILABLE **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
