import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Divider } from "@react-native-material/core";

export default function UserPage() {
  const [p, setP] = useState(null);

  useEffect(() => {

  }, []);

  const t = async () => {
  };

  return (
    <View style={myPostsStyles.container}>
      <View style={myPostsStyles.topBarContainer}>
        {/* My Posts    Personal Wins     Friends */}
        <Text variant="h3">My Posts is this above a divider?!</Text>
      </View>
      <Divider style={{ marginTop: 60 }} leadingInset={16} />
      <Text variant="h3">My Posts is this Working Under a divider???!!!?!?!</Text>
    </View>
  );
}

const myPostsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: "column",
    elevation: 2,
    height: 500,
    width: 200,
    backgroundColor: '#D814FF',
    position: 'relative',
    borderRadius: 999,
    overflow: 'auto',
  },
});