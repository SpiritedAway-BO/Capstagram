import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../Auth/firebase/firebase.js';
import axios from 'axios';



const AddPhotoCloudinary = ({ navigation }) => {

  const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!_photo.canceled) {
      const uri = _photo.assets[0].uri;
      const type = _photo.assets[0].type;
      const name = _photo.assets[0].fileName || 'blank';
      const source = {
        uri,
        type,
        name,
      };
      console.log('Photo', source);
      cloudinaryUpload(source);
    }
  };

  const takePhoto = async () => {
    let _photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!_photo.canceled) {
      console.log('chosen photo', _photo);
      // setFilePath(_photo);
    }
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'uw_blueocean');
    data.append('cloud_name', 'cwhrcloud');
    fetch('https://api.cloudinary.com/v1_1/cwhrcloud/upload', {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log('response data', data);
        // setPhoto(data.secure_url);
        axios.post('https://brave-beds-suffer-99-227-192-34.loca.lt/photos', {
          currentUser: auth.currentUser,
          uri: data.secure_url
        })
          .then(results => console.log('posted'))
          .catch(err => console.log('error posting photo', err));
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: photo }}
          style={styles.backgroundImage}>
        </Image>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          Add a Photo
        </Text>
        <TouchableOpacity onPress={addPhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Gallery Upload
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height - 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 1.28,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20
  }
});
export default AddPhotoCloudinary;