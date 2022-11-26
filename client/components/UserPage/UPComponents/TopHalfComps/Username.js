import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Username = (props) => {

  return (
    <View style={styles.nameAddContainer}>
      <View style={styles.username}>
        <Text style={styles.textStyle}>
          Firstname Lastname
        </Text>
      </View>
      <View style={styles.add}>
        <Ionicons name='ios-add-circle-outline' size={32} color='gray' />
      </View>
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
//    justifyContent: 'center',
    marginLeft: '0%',
    marginTop: '3%',
    marginBottom: '1%',
  },
  textStyle: {
//    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  add: {
    alignContents:'right',
    marginTop: '-6%',
    marginLeft: '-66%'
  },
});

export default Username;

