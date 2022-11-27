import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../components/Auth/firebase/firebase.js';

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
      axios.get(`https://wide-ideas-smash-99-227-192-34.loca.lt/photos/${currentUser.uid}`)
        .then(res => {
          setMainFeedData(res.data[0].photos);
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
