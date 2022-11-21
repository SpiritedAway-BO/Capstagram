import React, { useState, useEffect } from 'react';
import { Image, Button, View, ScrollView, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Divider } from "@react-native-material/core";

export default function UserPage() {
  const [p, setP] = useState(null);

  useEffect(() => {

  }, []);

  const t = async () => {
  };

  return (
    <ScrollView>
      <View style={myPostsStyles.container}>

      {/* Map over user's posts and print out like below */}
        <View style={myPostsStyles.card}>
          <View style={myPostsStyles.pictureContainer}>
            <Image
              style={myPostsStyles.picture}
              source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}/>
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
          <View style={myPostsStyles.captions}>
            <View style={myPostsStyles.captionUser}>
              <Text style={{color: "white"}}>User 1</Text>
            </View>
            <View style={myPostsStyles.caption}>
              <Text style={{color: "white"}}>Caption 1</Text>
            </View>
            <View style={myPostsStyles.likes}>
              <Text style={{color: "white"}}>2 *</Text>
            </View>
          </View>
        </View>

        <View style={myPostsStyles.card}>
          <View style={myPostsStyles.pictureContainer}>
            <Image
              style={myPostsStyles.picture}
              source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}/>
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
          <View style={myPostsStyles.captions}>
            <View style={myPostsStyles.captionUser}>
              <Text style={{color: "white"}}>User 2</Text>
            </View>
            <View style={myPostsStyles.caption}>
              <Text style={{color: "white"}}>Caption 2</Text>
            </View>
            <View style={myPostsStyles.likes}>
              <Text style={{color: "white"}}>4 *</Text>
            </View>
          </View>
        </View>

        <View style={myPostsStyles.card}>
          <View style={myPostsStyles.pictureContainer}>
            <Image
              style={myPostsStyles.picture}
              source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}/>
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
          <View style={myPostsStyles.captions}>
            <View style={myPostsStyles.captionUser}>
              <Text style={{color: "white"}}>User 1</Text>
            </View>
            <View style={myPostsStyles.caption}>
              <Text style={{color: "white"}}>Caption 1</Text>
            </View>
            <View style={myPostsStyles.likes}>
              <Text style={{color: "white"}}>1 *</Text>
            </View>
            <View style={myPostsStyles.captionUser}>
              <Text style={{color: "white"}}>User 2</Text>
            </View>
            <View style={myPostsStyles.caption}>
              <Text style={{color: "white"}}>Caption 2</Text>
            </View>
            <View style={myPostsStyles.likes}>
              <Text style={{color: "white"}}>1 *</Text>
            </View>
            <View style={myPostsStyles.captionUser}>
              <Text style={{color: "white"}}>User 3</Text>
            </View>
            <View style={myPostsStyles.caption}>
              <Text style={{color: "white"}}>Caption 3</Text>
            </View>
            <View style={myPostsStyles.likes}>
              <Text style={{color: "white"}}>1 *</Text>
            </View>
          </View>
        </View>


      </View>
    </ScrollView>
  );
}

const myPostsStyles = StyleSheet.create({
  container: {
    flexdirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: 'black',
    alignItems: "center"
  },
  topBarContainer: {
    justifyContent: 'center',
  },
  card: {
    alignItems: "center",

  },
  picture: {
    width: 200,
    height: 200
  },
  captions: {
    flexDirection: "column",
    width: 200,
    height: 150,
    alignItems: "center"
  },
  captionUser: {
    width: 50,
    height: 50,
    flex: .75,
  },
  caption: {
    width: 150,
    height: 50,
    flex: 2,
  },
  likes: {
    flex: .5,
    width: 25,
    height: 50
  }
});