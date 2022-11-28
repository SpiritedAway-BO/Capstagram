import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../components/Auth/firebase/firebase.js';
import { LOCALTUNNEL } from '../components/Auth/firebase/config.js';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [mainFeedData, setMainFeedData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [friends, setFriends] = useState(null);


  /** asynchronously sets current userid so it is not undefined in other modules **/
  useEffect(() => {
    if (Object.keys(currentUser) > 0) {
      setCurrentUser(auth.currentUser);
    }
    // axios.get(`http://localhost:8000/user/${currentUser.uid}`)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
  }, []);
  if (Object.keys(currentUser) > 0) {
    console.log('currentUser in AppContext', currentUser.uid);
  }
  /** INSERT VARIABLE NAMES into value deconstruction to make them available in other modules */
  const value = {
    currentUser,
    mainFeedData,
    setMainFeedData,
    currentPost,
    setCurrentPost,
    friends,
    setFriends
  };

  /** MAKES CONTEXT AVAILABLE **/
  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:8000/photos/${currentUser.uid}`)
        .then(res => {
          console.log(res.data);
          setMainFeedData(res.data);
        })
        .catch(err => console.log('error hello', err));
      // console.log('currentUser', currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:8000/user/${currentUser.uid}/friends`)
        .then(res => {
          setFriends(res.data);
        })
        .catch(err => console.log('Fetch Friends Error', err));
    }
  }, [currentUser]);

  /** makes Context available to other modules **/
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
