import React from 'react';
import { SafeAreaView, FlatList, View, ScrollView, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Avatar, Divider } from '@react-native-material/core';
import PersonalWins from '../PersonalWins/PersonalWins.js';
import { LinearGradient } from 'expo-linear-gradient';

import UserPic from './UPComponents/TopHalfComps/UserPic.js';
import Posts from './UPComponents/TopHalfComps/Posts.js';
import Friends from './UPComponents/TopHalfComps/Friends.js';
import Username from './UPComponents/TopHalfComps/Username.js';
import Bio from './UPComponents/TopHalfComps/Bio.js';
import NavBar from './UPComponents/BottomHalfComps/NavBar.js';
import MyPosts from './UPComponents/BottomHalfComps/MyPosts.js';


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
          <UserPic />
          <Posts />
          <Friends navigation={navigation}/>
        </View>
        <Username />
        <Bio />
      </View>
      <NavBar tab={tab} setTab={setTab} onWins={onWins} onPosts={onPosts}/>

      <Divider style={{ marginTop: 0, marginBottom: 5 }} color="#B19CD9" leadingInset={20} trailingInset={20}/>

      {tab === 'posts' ?
        <FlatList
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        style={styles.imageList}
        data={DATA}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()} />
        : <PersonalWins/>
      }
    </>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    // height: Dimensions.get('window').height/3,
    flex: .4,
    padding: '2%',
  },
  uiStatsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginTop: '3%',
    alignItems: 'center',
  },
  divider: {
    marginTop: '1%',
  },
  image: {
    width: Dimensions.get('window').width / 3.14,
    height: Dimensions.get('window').height / 4,
    marginRight: Dimensions.get('window').width * 0.01,
    marginBottom: Dimensions.get('window').width * 0.01,
  },
  flatListContainer: {
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
});

export default UserPage;