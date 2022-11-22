import React, { useState, useEffect } from 'react';
import { Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { RNS3 } from 'react-native-aws3';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera, CameraType } from 'expo-camera';

export default function AddPhoto() {
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     const permission = await Permissions.getAsync(Permissions.CAMERA);
  //     if (permission.status !== 'granted') {
  //       const newPermission = await Permissions.askAsync(Permissions.CAMERA);
  //       if (newPermission.status === 'granted') {
  //         //its granted.
  //       }
  //     }
  //   };
  //   getPermissions();
  // }, []);

  // const addPhoto = async () => {
  //   let _photo = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     base64: true,
  //     quality: 1,
  //   });
  //   if (!_photo.canceled) {
  //     console.log('chosen photo', _photo.base64);
  //     setFilePath(_photo);
  //   }
  // };

  const takePhoto = async () => {
    let _photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!_photo.canceled) {
      console.log('chosen photo', _photo);
      setFilePath(_photo);
    }
  };

  const uploadFile = () => {
    if (Object.keys(filePath).length === 0) {
      alert('Please select image first');
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.uri,
        name: filePath.fileName,
        type: filePath.type,
      },
      {
        keyPrefix: 'uploads/', // Ex. myuploads/
        bucket: '**Name of Your AWS Bucket**', // Ex. aboutreact
        region: '**Region**', // Ex. ap-south-1
        accessKey: '**Replace your Access Key**',
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: '**Replace your Secrete Key**',
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      },
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${progress.percent
          }%)`,
        ),
      )
      .then((response) => {
        if (response.status !== 201) {
          alert('Failed to upload image to S3');
        }
        console.log(response.body);
        setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;
        setUploadSuccessMessage(
          `Uploaded Successfully:
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`,
        );
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        Press Choose Photo to select from gallery{'\n'}
        Press Take Photo to take a new photo
      </Text>
      <View style={styles.container}>
        {filePath.uri ? (
          <>
            <Image
              source={{ uri: filePath.uri }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>
              {filePath.uri}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyleGreen}
              onPress={uploadFile}>
              <Text style={styles.textStyleWhite}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        {uploadSuccessMessage ? (
          <Text style={styles.textStyleGreen}>
            {uploadSuccessMessage}
          </Text>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={addPhoto}>
          <Text style={styles.textStyleWhite}>
            Choose Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={takePhoto}>
          <Text style={styles.textStyleWhite}>
            Take Photo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  textStyleGreen: {
    padding: 10,
    color: 'green',
  },
  textStyleWhite: {
    padding: 10,
    color: 'white',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    marginVertical: 10,
    width: '100%',
  },
  buttonStyleGreen: {
    alignItems: 'center',
    backgroundColor: 'green',
    marginVertical: 10,
    width: '100%',
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    margin: 5,
  },
});


/*

  const [postPhoto, setPostPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!_photo.canceled) {
      console.log('chosen photo', _photo);
      const uri = _photo.assets[0].uri;
      const type = _photo.assets[0].type;
      const name = _photo.assets[0].fileName;
      const source = {
        uri,
        type,
        name,
      };
      console.log('photo', _photo);
      // cloudinaryUpload(source);
      setPostPhoto(uri);
    }
    // if (!_photo.canceled) {
    //   setPhoto(_photo.assets[0].uri);
    // }
  };

  const cloudinaryUpload = (photo) => {
    console.log(photo);

    // const pls = createCloudinaryWidget((url) => {
    //   setPostPhoto(url);
    // });

    // console.log(pls);

    // const data = new FormData();
    // data.append('file', photo);
    // data.append('upload_preset', 'uw_blueocean');
    // data.append('cloud_name', 'cwhrcloud');
    // fetch('https://api.cloudinary.com/v1_1/cwhrcloud', {
    //   method: 'post',
    //   body: data
    // }).then(res => res.json()).
    //   then(data => {
    //     setPostPhoto(photo.uri);
    //     console.log('data', data);
    //   }).catch(err => {
    //     console.log(err);
    //     Alert.alert('An Error Occured While Uploading');
    //   });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: postPhoto }}
          style={styles.backgroundImage}>
        </Image>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          ImagePicker to Cloudinary
        </Text>
        <TouchableOpacity onPress={addPhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>

    </View >
  );

  const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height - 90
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
    margin: 20,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
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
    fontSize: 20,
  }
});
*/