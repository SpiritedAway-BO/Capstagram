import React from 'react';
import { FlatList, View, ScrollView, StyleSheet } from 'react-native';
import Post from './Post.js';

const UserPage = () => {

  const dummyData = [
    {
      key: 1,
      photo: "https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      username: "Bob Billy",
    },
    {
      key: 2,
      photo: "https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      username: "Billy Bob",
    },
    {
      key: 3,
      photo: "https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      username: "Billy Bob",
    }
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.feedContainer}>
        <FlatList
          style={{width: "50", height: "50"}}
          data={dummyData}
          renderItem={(aPost) => (
            <Post
              keyExtractor={(aPost)=>{aPost.key}}
              // avatar={aPost.avatar}
              photo={aPost.photo}
              // username={aPost.username}
            />
          )}
          numColumns={3}>
        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '400',
    backgroundColor: 'white',
  },
  feedContainer: {
    width: '100%',
  }
});

export default UserPage;





// import React, { useState, useEffect } from 'react';
// import { Image, Button, View, ScrollView, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Divider } from "@react-native-material/core";

// export default function UserPage() {
//   const [p, setP] = useState(null);

//   useEffect(() => {

//   }, []);

//   const t = async () => {
//   };

//   return (
//     <ScrollView>
//       <View style={myPostsStyles.container}>

//       {/* Map over user's posts and print out like below */}
//         <View style={myPostsStyles.card}>
//           <View style={myPostsStyles.pictureContainer}>
//             <Image
//               style={myPostsStyles.picture}
//               source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}/>
//           </View>
//           <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
//           <View style={myPostsStyles.captions}>
//             <View style={myPostsStyles.captionUser}>
//               <Text style={{color: "white"}}>User 1</Text>
//             </View>
//             <View style={myPostsStyles.caption}>
//               <Text style={{color: "white"}}>Caption 1</Text>
//             </View>
//             <View style={myPostsStyles.likes}>
//               <Text style={{color: "white"}}>2 *</Text>
//             </View>
//           </View>
//         </View>

//         <View style={myPostsStyles.card}>
//           <View style={myPostsStyles.pictureContainer}>
//             <Image
//               style={myPostsStyles.picture}
//               source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}/>
//           </View>
//           <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
//           <View style={myPostsStyles.captions}>
//             <View style={myPostsStyles.captionUser}>
//               <Text style={{color: "white"}}>User 2</Text>
//             </View>
//             <View style={myPostsStyles.caption}>
//               <Text style={{color: "white"}}>Caption 2</Text>
//             </View>
//             <View style={myPostsStyles.likes}>
//               <Text style={{color: "white"}}>4 *</Text>
//             </View>
//           </View>
//         </View>

//         <View style={myPostsStyles.card}>
//           <View style={myPostsStyles.pictureContainer}>
//             <Image
//               style={myPostsStyles.picture}
//               source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}/>
//           </View>
//           <Divider style={{ marginTop: 10, marginBottom: 10 }} leadingInset={16} />
//           <View style={myPostsStyles.captions}>
//             <View style={myPostsStyles.captionUser}>
//               <Text style={{color: "white"}}>User 1</Text>
//             </View>
//             <View style={myPostsStyles.caption}>
//               <Text style={{color: "white"}}>Caption 1</Text>
//             </View>
//             <View style={myPostsStyles.likes}>
//               <Text style={{color: "white"}}>1 *</Text>
//             </View>
//             <View style={myPostsStyles.captionUser}>
//               <Text style={{color: "white"}}>User 2</Text>
//             </View>
//             <View style={myPostsStyles.caption}>
//               <Text style={{color: "white"}}>Caption 2</Text>
//             </View>
//             <View style={myPostsStyles.likes}>
//               <Text style={{color: "white"}}>1 *</Text>
//             </View>
//             <View style={myPostsStyles.captionUser}>
//               <Text style={{color: "white"}}>User 3</Text>
//             </View>
//             <View style={myPostsStyles.caption}>
//               <Text style={{color: "white"}}>Caption 3</Text>
//             </View>
//             <View style={myPostsStyles.likes}>
//               <Text style={{color: "white"}}>1 *</Text>
//             </View>
//           </View>
//         </View>


//       </View>
//     </ScrollView>
//   );
// }

// const myPostsStyles = StyleSheet.create({
//   container: {
//     flexdirection: "column",
//     height: "100%",
//     width: "100%",
//     backgroundColor: 'black',
//     alignItems: "center"
//   },
//   topBarContainer: {
//     justifyContent: 'center',
//   },
//   card: {
//     alignItems: "center",

//   },
//   picture: {
//     width: 200,
//     height: 200
//   },
//   captions: {
//     flexDirection: "column",
//     width: 200,
//     height: 150,
//     alignItems: "center"
//   },
//   captionUser: {
//     width: 50,
//     height: 50,
//     flex: .75,
//   },
//   caption: {
//     width: 150,
//     height: 50,
//     flex: 2,
//   },
//   likes: {
//     flex: .5,
//     width: 25,
//     height: 50
//   }
// });