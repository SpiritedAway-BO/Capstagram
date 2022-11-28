import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Username = ({currentUser}) => {

  const [ isAdded, setIsAdded ] = React.useState(false);

  const addDeleteFriend = () => {
    if (isAdded) {
      // put request for deleting this friend
      setIsAdded(false);
    } else {
      // put request for adding this friend
      setIsAdded(true);
    }
  }
  return (
    <View style={styles.nameAddContainer}>
      <View style={styles.username}>
        <Text style={styles.textStyle}>
          {currentUser.displayName ? currentUser.displayName
          :
          null}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.add} onPress={e => {addDeleteFriend()}} >
        { isAdded ?
          <Ionicons name='ios-add-circle' size={32} color='green'  />
          :
          <Ionicons name='ios-add-circle-outline' size={32} color='gray' />
        }
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  nameAddContainer: {
    flexDirection: 'row',
  },
  username: {
    alignSelf: 'left',
    width: '83%',
    marginLeft: '0%',
    marginTop: '3%',
    marginBottom: '1%',
  },
  textStyle: {
    fontWeight: 'bold',
  },
  add: {
    alignContents:'right',
    marginTop: '-6%',
    marginLeft: '-66%',
  },
});

export default Username;

