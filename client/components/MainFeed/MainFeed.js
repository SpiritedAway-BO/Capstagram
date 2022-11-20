import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Surface, Stack } from '@react-native-material/core';

export default function MainFeed() {
  return (
    <View>
      <Surface
        elevation={5}
        category="large"
        style={{ width: 300, height: 400 }}>
        <View>
          <Image source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}} style={{width: '100%', height: '80%'}}/>
          <Text>user1: caption1</Text>
          <Text>user2: caption2</Text>
          <Text>user3: caption3</Text>
        </View>
      </Surface>
    </View>
  );
}