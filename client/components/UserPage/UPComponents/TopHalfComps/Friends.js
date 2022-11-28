import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const Friends = ({ numFriends, navigation }) => {

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.friendsContainer}>
      <View style={styles.friendStats} >
        <Text style={styles.textStyle}>
          {numFriends}
        </Text>
        <Text style={styles.textStyle}>
          Friends
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friendsContainer: {
    flex: .5,
    justifyContent: 'center',
  },
  friendStats: {
    alignSelf: 'center',
    alignContents: 'center',
    textAlign: 'center',
    justifySelf: 'center',
    marginLeft: '5%',
    width: '100%',
  },
  textStyle: {
    color:"black",
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Friends;