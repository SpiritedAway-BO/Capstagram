import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { createUser, auth } from './firebase/firebase.js';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  const handleSignUp = () => {
    if (!validate(email)) {
      alert('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      alert('Set a password with at least 8 characters.');
      return;
    }

    setIsLoading(true);
    createUser(email, password, username)
      .then(userCredentials => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        setTimeout(() => {
          navigation.navigate('Main Feed');
          setIsLoading(false);
        }, 200);

      })
      .catch(err => {
        console.log(err);
        alert('This email is already in use.');
        setIsLoading(false);
      });
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Sign up!</Text>
          <TextInput placeholder='Username' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={username} style={styles.inputField} onChangeText={text => setUsername(text)} textContentType="username" enablesReturnKeyAutomatically autoCorrect="false" />
          <TextInput placeholder='Email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.inputField} onChangeText={text => setEmail(text)} keyboardType="email-address" textContentType="email" enablesReturnKeyAutomatically />
          <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.inputField} secureTextEntry onChangeText={text => setPassword(text)} onSubmitEditing={handleSignUp} textContentType="password" enablesReturnKeyAutomatically />
          <Text style={styles.tos}>By continuing, you agree to Capstagram's Terms of Service and acknowledge Capstagram's Privacy Policy.</Text>
          <TouchableOpacity style={isLoading ? styles.loadingWrapper : styles.signUpBtnContainer} onPress={handleSignUp} disabled={isLoading ? true : false}>
            <Text style={isLoading ? styles.loadingButton : styles.signUpButton}>{isLoading ? 'Loading..' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
        <View styles={styles.haveaccount}>
          <Text style={styles.haveaccounttext}>Already have an account?</Text>
          <TouchableOpacity style={styles.buttonGrp} onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Log In.</Text>
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
    alignItems: 'center',
    width: "100%",
  },
  inputContainer: {
    width: '95%',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: "relative",
    marginTop: 160,
    marginLeft: 10
  },
  inputField: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 50,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    fontSize: 16,
    marginBottom: 14
  },
  headerWrapper: {
    position: 'absolute',
    paddingVertical: '60%',
    borderWidth: 1,
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke',
    position: "absolute",
    top: -60,
    left: -20
  },
  signUpBtnContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFB347",
    borderRadius: 6,
  },
  signUpButton: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700"
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  link: {
    color: "whitesmoke",
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  haveaccounttext: {
    marginTop: 21,
    color: "whitesmoke",
    alignSelf: 'center',
  },
  tos: {
    color: '#888',
    marginBottom: 14,
    paddingHorizontal: 7
  },
  loadingWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#888",
    borderRadius: 6,
  },
  loadingButton: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700"
  },
});


export default SignUp;