const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 1. Use mongoose to establish a connection to MongoDB

mongoose.connect('mongodb://localhost:27017/blueocean');

// 2. Set up any schema and models needed by the app

let friendsSchema = new Schema({
  friendFirebaseID: { type: String, default: 'BJUtNzadq8hgWKQ7l5vxg1ys1vt2', required: true }
});

let Friends = mongoose.model('Friends', friendsSchema);

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
  friends: { type: Array, default: [friendsSchema] },
  photos: [photoSchema],
  captions: [captionSchema]
});

let Users = mongoose.model('Users', userSchema);

module.exports = {
  // user req handling
  addUser: (userInfo) => {
    return Users.create(userInfo);
  },
  getUsers: () => {
    return Users.find({});
  },
  getUser: (userID) => {
    return Users.findOne({ firebaseID: userID });
  },
  updateUserProfilePic: (currUserName, picURI) => {
    return Users.findOneAndUpdate({ username: currUserName }, { profilePicURI: picURI }, { new: true });
  },
  // captions req handling
  getCaptions: (photoID) => {
    return Photos.find({ _id: photoID });
  },
  postCaption: (username, photoID, captionBody) => {
    return Photos.findOneAndUpdate({ _id: photoID }, {
      $push: {
        captions: captionBody
      }
    }, { new: true });
  },
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
// // 4. Import the models into any modules that need them