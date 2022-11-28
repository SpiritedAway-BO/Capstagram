import { LOCALTUNNEL } from '../Auth/firebase/config.js';

import React from 'react';
import Axios from 'axios';
import { AppContext } from '../../contexts/AppContext.js';

import { SafeAreaView, FlatList, View, ScrollView, StyleSheet, Text, Image, Modal, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import { Avatar, Divider } from '@react-native-material/core';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useIsFocused } from '@react-navigation/native';

import PersonalWins from '../PersonalWins/PersonalWins.js';

import UserPic from './UPComponents/TopHalfComps/UserPic.js';
import Posts from './UPComponents/TopHalfComps/Posts.js';
import Friends from './UPComponents/TopHalfComps/Friends.js';
import Username from './UPComponents/TopHalfComps/Username.js';
import Bio from './UPComponents/TopHalfComps/Bio.js';
import NavBar from './UPComponents/BottomHalfComps/NavBar.js';
import MyPosts from './UPComponents/BottomHalfComps/MyPosts.js';
import SinglePostView from './UPComponents/BottomHalfComps/SinglePostView.js';


const UserPage = ({ navigation }) => {

  const isFocused = useIsFocused();
  const { currentUser } = React.useContext(AppContext);
  const [friends, setFriends] = React.useState([]);

  const [tab, setTab] = React.useState('posts');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [myPosts, setMyPosts] = React.useState([]);
  const [modalPost, setModalPost] = React.useState({});

  React.useEffect(() => {
    if (currentUser) {
      Axios.get(`${LOCALTUNNEL}/user/${currentUser.uid}/photos`)
        .then((res) => {
          setMyPosts(res.data);
          setModalPost(res.data[0]);
        })
        .catch((err) => console.log('Error @ UserPage Axios.get: ', err));
      Axios.get(`${LOCALTUNNEL}/user/${currentUser.uid}/friends`)
        .then(res => {
          setFriends(res.data);
        })
        .catch(err => console.log('Fetch Friends Error', err));
    }
  }, [isFocused]);


  const onWins = () => {
    setTab('wins');
  };

  const onPosts = () => {
    setTab('posts');
  };

  const imagePress = (item) => {
    setModalVisible(true);
    setModalPost(item);
  };

  const renderImage = ({item}) => (
    <TouchableOpacity style={{}} onPress={() => imagePress(item)}>
      <Image
        source={{uri: item.url}}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%', blurRadius:"100%"}}>
      <View style={styles.userInfoContainer}>
        <View style={styles.uiStatsBox}>
          <UserPic myPosts={myPosts}/>
          <Posts numPosts={myPosts.results.length}/>
          <Friends numFriends={friends.length} navigation={navigation}/>
        </View>
        <Username myPosts={myPosts}/>
        <Bio />
      </View>
      <NavBar tab={tab} setTab={setTab} onWins={onWins} onPosts={onPosts}/>

      <Divider style={{ marginTop: 0, marginBottom: 5 }} color="#B19CD9" leadingInset={20} trailingInset={20}/>
      <View style={{flex:1}} >
        {tab === 'posts' ?
          myPosts ?
            <FlatList
            numColumns={3}
            contentContainerStyle={styles.flatListContainer}
            style={styles.imageList}
            data={myPosts.results}
            renderItem={renderImage}
            keyExtractor={(item, index) => item.id} />
            : null
          : <PersonalWins/>
        }
      </View>
      {modalPost ?
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible} >
          <BlurView intensity={25} style={styles.blurContainer}>
            <TouchableOpacity
              style={{ height: '100%', width: '95%', alignSelf: "center", flexGrow:"5", justifyContent: "center"}}
              onPress={() => setModalVisible(false)} >
              <SinglePostView post={modalPost} navigation={navigation} currentUser={currentUser}/>
            </TouchableOpacity>
          </BlurView>
        </Modal>
        : null
      }
    </View>
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
    //flex: 2,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    padding: '1%'
  },
});

export default UserPage;