import { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Post from './Post.js';
import { AppContext } from '../../contexts/AppContext.js';
import { auth } from '../Auth/firebase/firebase.js';
import {LOCALTUNNEL} from '../../components/Auth/firebase/config';
import axios from 'axios';

const MainFeed = ({ navigation }) => {
  const { mainFeedData, setMainFeedData, currentUser, setCurrentUser } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    console.log('refreshing');
    axios.get(`${LOCALTUNNEL}/photos/${currentUser.uid}`)
      .then(res => {
        console.log(res.data);
        setMainFeedData(res.data);
      })
      .catch(err => console.log('Error refreshing', err));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (mainFeedData) {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.feedContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
          {mainFeedData.sort((a, b) => Number(b.timePosted) - Number(a.timePosted)).map(post => <Post key={post.id} post={post} navigation={navigation} />)}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  feedContainer: {
    width: '100%',
  }
});

export default MainFeed;
