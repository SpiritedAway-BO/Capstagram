const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB

mongoose.connect('mongodb://localhost/blueocean');

// 2. Set up any schema and models needed by the app

let friendsSchema = mongoose.Schema({
  friendFirebaseID: Number
});

let Friends = mongoose.model('Friends', friendsSchema);

let captionSchema = mongoose.Schema({
  photoID: Number,
  body: String,
  captioner: String,
  likes: Number
});

let Captions = mongoose.model('Captions', captionSchema);

let photoSchema = mongoose.Schema({
  creator: String,
  uri: String,
  timePosted: String,
  captions: [Captions]
});

let Photos = mongoose.model('Photos', photoSchema);

let userSchema = mongoose.Schema({
  firebaseID: { type: Number, required: true },
  username: { type: String, required: true },
  profilePicURI: { type: String, default: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png' },
  friends: [Friends],
  photos: [Photos],
  captions: [Captions]
});

let Users = mongoose.model('Users', userSchema);

// User req handling
let addUser = (userInfo) => {
  return Users.create(userInfo);
};

let getUsers = () => {
  return Users.find({});
};

let getUser = (userID) => {
  return Users.findOne({ firebaseID: userID });
};

let updateUserProfilePic = (currUserName, picURI) => {
  return Users.findOneAndUpdate({ username: currUserName }, { profilePicURI: picURI }, { new: true });
};

// Captions req handling
let getCaptions = (photoID) => {
  return Photos.find({ _id: photoID });
};

let postCaption = (username, photoID, captionBody) => {
  return Photos.findOneAndUpdate({ _id: photoID }, {
    $push: {
      captions: captionBody
    }
  }, { new: true });
};



let saveEntry = (data) => {
  return Glossary.create(data);
}

let getEntries = () => {
  return Glossary.find({});
}

let deleteEntry = (word) => {
  return Glossary.deleteOne(word);
}

let updateEntry = (entryObj) => {
  return Glossary.findOneAndUpdate({ word: entryObj.word }, {
    definition: entryObj.definition
  }, { new: true });
}

// 3. Export the models
module.exports.saveEntry = saveEntry;
module.exports.getEntries = getEntries;
module.exports.deleteEntry = deleteEntry;
module.exports.updateEntry = updateEntry;
// 4. Import the models into any modules that need them