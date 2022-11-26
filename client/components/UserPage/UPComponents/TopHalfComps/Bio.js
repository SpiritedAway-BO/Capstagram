import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const Bio = (props) => {

  return (
    <View style={styles.bioText}>
        <Text>
          LONG LONG LONG LONG ABOUT ME. LONG LONG LONG LONG ABOUT ME. LONG LONG LONG LONG ABOUT ME. LONG LONG LONG LONG ABO
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bioText: {
    height: Dimensions.get('window').height/18.5,
  }
});

export default Bio;
