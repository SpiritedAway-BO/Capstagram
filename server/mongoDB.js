const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 1. Use mongoose to establish a connection to MongoDB

mongoose.connect('mongodb://localhost:27017/blueocean');

// 2. Set up any schema and models needed by the app

// let friendsSchema = new Schema({
//   friendFirebaseID: { type: String, default: 'BJUtNzadq8hgWKQ7l5vxg1ys1vt2', required: true }
// });

// let Friends = mongoose.model('Friends', friendsSchema);

let captionSchema = new Schema({
  photoID: Number,
  body: String,
  captioner: String,
  likes: Number
});

let Captions = mongoose.model('Captions', captionSchema);

let photoSchema = new Schema({
  creator: String,
  uri: String,
  timePosted: String,
  captions: [captionSchema]
});

let Photos = mongoose.model('Photos', photoSchema);

let userSchema = new Schema({
  firebaseID: { type: String, required: true },
  username: { type: String, required: true },
  profilePicURI: { type: String, default: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png' },
  friends: { type: Array },
  photos: [photoSchema],
  captions: [captionSchema]
});

let Users = mongoose.model('Users', userSchema);

module.exports = {
  // user req handling
  addUser: async (userInfo) => {
    const userToAdd = await Users.create(userInfo);
    return userToAdd;
  },
  getUsers: async () => {
    const dbUsers = await Users.find({});
    return dbUsers;
  },
  getUser: async (userID) => {
    const oneUser = await Users.findOne({ firebaseID: userID });
    return oneUser;
  },
  updateUserProfilePic: async (currUserName, picURI) => {
    const ppUpdate = await Users.findOneAndUpdate({ username: currUserName }, { profilePicURI: picURI }, { new: true });
    return ppUpdate;
  },
  // captions req handling
  getCaptions: async (photoID) => {
    const photoCaptions = await Photos.find({ _id: photoID });
    return photoCaptions;
  },
  postCaption: async (username, photoID, captionBody) => {
    const postCaption = await Photos.findOneAndUpdate({ _id: photoID }, {
      $push: {
        captions: captionBody
      }
    }, { new: true });
    return postCaption;
  },
  // photos req handling
  postPhoto: async (userInfo, uri) => {
    let photoToAdd = new Photos({ creator: userInfo.displayName, uri: uri, timePosted: Date.now(), captions: [] });
    photoToAdd.save();
    const postPhoto = await Users.findOneAndUpdate({ firebaseID: userInfo.uid }, { $push: { photos: photoToAdd } });
    return postPhoto;
  },
  getPhotos: async (userID) => {
    var friendsIDs = [];
    const userFriends = await Users.findOne({ firebaseID: userID }, { friends: 1, _id: 0 });
    console.log(userFriends.friends);
    // return Promise.all(userFriends.friends.map());


    const friendsPhotosPromise = userFriends.friends.map((friend) => {
      return Users.findOne({ firebaseID: friend });
    });
    // let friendsPhotoData = await Promise.all(friendsPhotosPromise);
    // console.log(friendsPhotoData);
    // console.log(friendsPhotosPromise);

    friendsPhotosPromise
      .then(results => console.log(results))
      .catch(err => console.log(err));

    // const friendsPhotos = Promise.all(friendsPromise)
    //   .then(success => console.log(success))
    //   .catch(err => console.log('no haha u suck'));
    // .exec((err, doc) => {
    //   console.log(doc);
    //   return doc;
    // });
    // .then(results => console.log(results))
    // .catch(err => console.log(err));
    // console.log('query from friends', friendsQuery);
    // return friendsQuery;
  }
};




// let saveEntry = (data) => {
//   return Glossary.create(data);
// }

// let getEntries = () => {
//   return Glossary.find({});
// }

// let deleteEntry = (word) => {
//   return Glossary.deleteOne(word);
// }

// let updateEntry = (entryObj) => {
//   return Glossary.findOneAndUpdate({ word: entryObj.word }, {
//     definition: entryObj.definition
//   }, { new: true });
// }

// // 3. Export the models
// module.exports.saveEntry = saveEntry;
// module.exports.getEntries = getEntries;
// module.exports.deleteEntry = deleteEntry;
// module.exports.updateEntry = updateEntry;
// 4. Import the models into any modules that need them
