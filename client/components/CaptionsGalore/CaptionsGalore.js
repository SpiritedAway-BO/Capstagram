import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';

var DATA = [{
  id: 1234567,
  username: 'thisGuy',
  caption: 'It\'s the little things in life',
  upvotes: 5,
  usericon: './assets/favicon.png',
  voted: true
},
{
  id: 1234568,
  username: 'thisGuy',
  caption: 'Let me show you my Pokemon!',
  upvotes: 15,
  usericon: './assets/favicon.png',
  voted: false
}];

const Item = ({ caption }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{caption}</Text>
    <Text style={styles.title}>{caption}</Text>
  </View>
);

const CaptionsGalore = () => {

  const renderItem = ({ item }) => (
    <Item caption={item.caption} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default CaptionsGalore;

// const CaptionTitle = ({caption}) => {
//   console.log('caption', caption);
//   return (
//     <View style={styles.item}>
//       <Text style={styles.caption}>{caption}</Text>
//     </View>
//   );
// };


// export default function CaptionsGalore() {
//   console.log('here');

//   const renderCaption = ({caption}) => {
//     console.log('caption');
//     return (
//       <CaptionTitle caption={caption.caption} />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderCaption={renderCaption}
//         keyExtractor={(caption) => caption.id}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   caption: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// // container: {
// //   minWidth: '100%', //makes banner as wide as the screen
// //   top: 0, //this moves the title away from the top
// //   padding: 10, //this makes the
// //   backgroundColor: 'black',
// //   color: 'white',
// //   fontSize: 25,
// //   textAlign: 'center',
// //   marginTop: -20, //reduces the overhead padding between the header and the Apptop
// // },