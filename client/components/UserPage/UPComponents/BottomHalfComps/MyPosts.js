


//Not working right now..?
//Maybe can't have flatlist by itself ?


import React from 'react';
import { View, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';

var x = {
  uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'
};
var DATA = [x, x, x, x, x, x, x, x ];

const MyPosts = (props) => {

  const renderImage = ({item}) => (
    <View>
      <Image
        source={item}
        style={styles.image}
      />
    </View>
  );

  return (
    <FlatList
      numColumns={3}
      contentContainerStyle={styles.flatListContainer}
      style={styles.imageList}
      data={DATA}
      renderItem={renderImage}
      keyExtractor={(item, index) => index.toString()} />
  );
};

const styles = StyleSheet.create({
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

export default MyPosts;