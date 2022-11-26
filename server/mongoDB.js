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
  photoID: String,
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
  postCaption: (capUsername, photoID, captionBody, cb) => {
    console.log("trying to post caption!");
    let objIDPhoto = mongoose.Types.ObjectId(photoID);
    let captionToAdd = new Captions({
      photoID: objIDPhoto,
      body: captionBody,
      captioner: capUsername,
      likes: 0
    });
    captionToAdd.save();
    Photos.findOneAndUpdate({_id: objIDPhoto}, {$push: { captions: captionToAdd }}, {new: true}).exec((err, docs) => {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        console.log(docs);
        cb(null, docs);
      }
    });
  },
  // photos req handling
  postPhoto: (userInfo, uri) => {
    let photoToAdd = new Photos({creator: userInfo.username, uri: uri, timePosted: Date.now(), captions: []});
    photoToAdd.save();
    return Users.findOneAndUpdate({firebaseID: userInfo.uid}, {$push: {photos: photoToAdd}} );
  },
  getPhotos: (userID, cb) => {
    Users.findOne({firebaseID: userID}, {friends: 1, _id: 0}).exec((err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        let friendsArr = docs.friends;
        Users.find({firebaseID: {$in: friendsArr}}).select('photos').exec((err, docs) => {
          if (err) {
            cb(err, null);
          } else {
            console.log('docs inside mongoDB.js: ', docs);
            cb(null, docs);
          }
        });
      }
    });


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