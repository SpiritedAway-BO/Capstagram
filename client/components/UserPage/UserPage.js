import React from 'react';
import {FlatList, View, ScrollView, StyleSheet, Text, Image, Dimensions} from 'react-native';
import { Avatar } from '@react-native-material/core';

const UserPage = () => {

  return (
    <>
    <View contentContainerStyle={styles.userPageContainer} style={styles.userPCon}>
      <View style={styles.userInfoContainer}>
        <View style={styles.uiStatsBox}>
          <Avatar
              image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
              size={100}
              style={styles.avatar}/>
          <View style={styles.postStats}>
            <Text>Posts: 352095</Text>
          </View>
          <View style={styles.friendStats}>
            <Text>Friends: 1</Text>
          </View>
        </View>
        <View style={styles.aboutMeBox}>
          <Text>About me .........................................</Text>
        </View>
        <View style={styles.userPageNavBar}>
          <View style={styles.uPNVB} ></View>
        </View>
      </View>
       {/* <Divider style={styles.divider} leadingInset={16} /> */}
       <View style={styles.postsGridContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer} >
          <View style={styles.imageScroll}>
            <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
              <Image
              source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
              style={styles.image}/>
            </View>
        </ScrollView>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  userPageContainer: {
    width: "100%",
    height: "100%",
  },
  userPCon: {
    width: "100%",
    height: "100%",

    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "5px",
  },
  userInfoContainer: {
    height: Dimensions.get('window').height/2.5,

    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
  },
  divider : {
    marginTop: "1%",
  },
  postsGridContainer: {
    height: Dimensions.get('window').height/2.01,
    width: "100%",

    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
  },
  scrollContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  imageScroll: {
    padding: ".1%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: Dimensions.get('window').width/4.08,
    height: Dimensions.get('window').height/4.5,

    borderWidth: ".5px",
    borderRadius: "10px",
  },
  uiStatsBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5%",
  },
  postStats: {
    alignSelf: "center",

    // borderWidth: ".5px",
    // borderRadius: "10px",
  },
  friendStats: {
    alignSelf: "center",

    // borderWidth: ".5px",
    // borderRadius: "10px",
  },
  avatar: {


    // borderWidth: ".5px",
    // borderRadius: "10px",
  },
  aboutMeBox: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,

    borderWidth: ".5px",
    borderRadius: "10px",
  },
  userPageNavBar: {
    flex: .5,

    borderWidth: ".5px",
    borderRadius: "10px",
  }
});

export default UserPage;