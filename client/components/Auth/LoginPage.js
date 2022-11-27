import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import { loginUser, auth } from './firebase/firebase.js';
import { updateProfile, onAuthStateChanged } from "firebase/auth";

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Capstagram' }],
        });
      }
    });
    return unsubscribe;
  }, []);

  const loginHandler = () => {
    setIsLoading(true);
    loginUser(email, password)
      .then(() => {
        // console.log(auth.currentUser);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Capstagram' }],
        });
        setIsLoading(false);
      }).catch(err => {
        alert('Invalid email or password');
        setIsLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/orange.png')} />
          <Text style={styles.title}>Capstagram</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)} keyboardType="email-address" enablesReturnKeyAutomatically />
          <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)} onSubmitEditing={loginHandler} enablesReturnKeyAutomatically minLength={8} />
          <TouchableOpacity style={isLoading ? styles.loadingWrapper : styles.loginBtnWrapper} onPress={loginHandler} disabled={isLoading ? true : false}>
            <Text style={isLoading ? styles.loadingBtn : styles.loginBtn}>{isLoading ? 'Logging In..' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.signUp}>Don't have an account?</Text>
          <TouchableOpacity style={styles.buttonGrp} onPress={() => navigation.push('SignIn')}>
            <Text style={styles.link}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B19CD9',
    justifyContent: 'center',
    width: "100%",
  },
  inputContainer: {
    width: '95%',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginLeft: 8
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 50,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    fontSize: 16,
    marginBottom: 14
  },
  imageContainer: {
    alignItems: "center",
    width: "120%",
    marginVertical: 40
  },
  image: {
    width: 140,
    height: 133,
    left: -44,
    top: 30
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke',
    left: -44,
    top: 35
  },
  link: {
    color: "whitesmoke",
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  signUp: {
    marginTop: 21,
    color: "whitesmoke",
    alignSelf: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtnWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFB347",
    borderRadius: 6,
  },
  loginBtn: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700"
  },
  loadingWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#888",
    borderRadius: 6,
  },
  loadingBtn: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700"
  },
});

export default Login;