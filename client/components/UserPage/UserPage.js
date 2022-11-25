import React from 'react';
import { SafeAreaView, FlatList, View, ScrollView, StyleSheet, Text, Image, Dimensions} from 'react-native';
import { Avatar, Divider } from '@react-native-material/core';
import PersonalWins from '../PersonalWins/PersonalWins.js';

var x = {
  uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'
};
var DATA = [x, x, x, x, x, x, x, x ];

const UserPage = ({ navigation }) => {

  const [tab, setTab] = React.useState('posts');

  const onWins = () => {
    setTab('wins');
  };

  const onPosts = () => {
    setTab('posts');
  };

  const renderImage = ({item}) => (
    <View style={{}}>
      <Image
        source={item}
        style={styles.image}
      />
    </View>
  );

  return (
    <>
      <View style={styles.userInfoContainer}>
        <View style={styles.uiStatsBox}>
          <Avatar
            image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            size={80}
            style={styles.avatar}/>
          <View style={styles.postStats}>
            <Text>#</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.friendStats}>
            <Text onPress={() => navigation.navigate('Friends')}>
              #
            </Text>
            <Text>
            Friends
            </Text>
          </View>
        </View>
        <View style={styles.aboutMe}>
          <Text style={{textDecorationLine: 'underline'}}>
          About me
          </Text>
        </View>
        <View style={styles.aboutMeText}>
          <Text>
          This is a long, drawn out sentence that gives superficial, probably not true information about me.
          </Text>
        </View>

      </View>
      <View style={styles.userPageNavBar}>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <Text
            name="posts"
            style={{alignSelf: 'center', textDecorationLine: 'underline'}}
            onPress={onPosts}>
              My Posts
          </Text>
        </View>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <Text
            name="wins"
            style={{alignSelf: 'center', textDecorationLine: 'underline'}}
            onPress={onWins}>
              Personal Wins
          </Text>
        </View>
      </View>
      <Divider style={{ marginTop: 0, marginBottom: 5 }} color="purple" leadingInset={20} trailingInset={20}/>
      {tab === 'posts' ?
        <FlatList
          numColumns={3}
          contentContainerStyle={styles.ccFlatList}
          // columnWrapperStyle={{justifyContent: 'space-between'}}
          style={styles.imageList}
          data={DATA}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}/>
        : <PersonalWins/>}
    </>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    // height: Dimensions.get('window').height/3,
    flex: .4,
    padding: '2%',
  },
  divider: {
    marginTop: '1%',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ccFlatList: {
    //justifyContent:"space-around",
    alignItems: 'flex-start',
    width: '100%',
  },
  imageList: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: '1%',
  },
  image: {
    width: Dimensions.get('window').width / 3.14,
    height: Dimensions.get('window').height / 4,
    marginRight: Dimensions.get('window').width * 0.01,
    marginBottom: Dimensions.get('window').width * 0.01,
  },
  uiStatsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '6%',
    alignItems: 'center',
  },
  postStats: {
    alignSelf: 'center',

  },
  friendStats: {
    alignSelf: 'center',

  },
  avatar: {
  },
  aboutMe: {
    alignSelf: 'left',
    justifyContent: 'center',
    marginLeft: '8%',
  },
  aboutMeText: {
  },
  userPageNavBar: {
    justifyContent: 'space-between',
    flex: .1,
    flexDirection: 'row',
  }
});

export default UserPage;