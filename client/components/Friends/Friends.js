import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Friends() {
  return (
    <View>
      <Text style={styles.container}>Friends</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%', //makes banner as wide as the screen
    top: 0, //this moves the title away from the top
    padding: 10, //this makes the
    backgroundColor: 'black',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: -20, //reduces the overhead padding between the header and the Apptop
  },
});