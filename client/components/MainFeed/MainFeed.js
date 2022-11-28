import { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Post from './Post.js';
import { AppContext } from '../../contexts/AppContext.js';
import { auth } from '../Auth/firebase/firebase.js';

const MainFeed = ({ navigation }) => {
  const { mainFeedData, setCurrentUser } = useContext(AppContext);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, []);

  if (mainFeedData) {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.feedContainer}>
          {mainFeedData.map(post => <Post key={post.id} post={post} navigation={navigation} />)}
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
