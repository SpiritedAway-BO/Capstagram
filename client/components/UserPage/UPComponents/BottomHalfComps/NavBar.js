import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = ({tab, setTab, onWins, onPosts}) => {

  const UnHighlightedLink = (props) => {
    return (
      <Text
        name={props.tab}
        style={{alignSelf: 'center', textAlign: "center", width: "100%", marginLeft: "0%", color:"gray"}}
        >
          {props.label}
      </Text>
    );
  };

  const HighlightedLink = (props) => {
    return (
      <Text
        name={props.tab}
        style={{alignSelf: 'center', textAlign: "center", width: "100%", height: "100%", marginLeft: "0%", color:"#FF842B", fontWeight: 'bold', textDecorationLine: 'underline'}}
        >
          {props.label}
      </Text>
    );
  };

  return (
    <View style={styles.userPageNavBar}>
        <View style={styles.userPageNavBarContainer}>

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={onPosts} style={{height:"100%", marginTop: "2%"}}>
              {tab === "posts" ?
                <HighlightedLink tab="posts" label="My Posts" />
                :
                <UnHighlightedLink tab="posts" label="My Posts" />
              }
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={onWins} style={{height:"100%", marginTop: "2%"}}>
              {tab === "wins" ?
                <HighlightedLink tab="wins" label="Personal Wins" />
                :
                <UnHighlightedLink tab="wins" label="Personal Wins" />
              }
            </TouchableOpacity>
          </View>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  userPageNavBar: {
    // justifyContent: 'stretch',
    flex: .1,
    // flexDirection: 'row'
  },
  userPageNavBarContainer: {
    height: "100%",
    width: "100%",
    justifyContent: 'stretch',
    flexDirection: 'row',
  },
});

export default NavBar;
