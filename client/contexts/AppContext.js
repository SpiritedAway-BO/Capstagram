import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../components/Auth/firebase/firebase.js';
import {LOCALTUNNEL} from '../components/Auth/firebase/config.js';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState('stephc123');
  const [currentUser, setCurrentUser] = useState('');
  const [mainFeedData, setMainFeedData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  /** asynchronously sets current userid so it is not undefined in other modules **/
  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);
  // console.log('currentUser in AppContext', currentUser.uid)
 /** INSERT VARIABLE NAMES into value deconstruction to make them available in other modules */
  const value = {
    username,
    setUsername,
    currentUser,
    mainFeedData,
    setMainFeedData,
    currentPost,
    setCurrentPost
  };

 /** MAKES CONTEXT AVAILABLE **/
  useEffect(() => {
    if (currentUser) {
      axios.get(`https://localhost:8000/photos/${currentUser.uid}`)
        .then(res => {
          setMainFeedData(res.data[1].photos);

        })
        .catch(err => console.log('error hello', err));
    }
  }, [currentUser]);

  /** makes Context available to other modules **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
