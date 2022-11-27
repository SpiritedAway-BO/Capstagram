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
  likes: Number,
  likeUsers: { type: Array }
});

var Captions = mongoose.model('Captions', captionSchema);

let photoSchema = new Schema({
  creator: String,
  uri: String,
  timePosted: String,
  captions: [captionSchema]
});

var Photos = mongoose.model('Photos', photoSchema);

let userSchema = new Schema({
  firebaseID: { type: String, required: true },
  username: { type: String, required: true },
  profilePicURI: { type: String, default: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png' },
  friends: { type: Array },
  photos: [photoSchema],
  captions: [captionSchema]
});

var Users = mongoose.model('Users', userSchema);

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
  updateUserProfilePic: async (currFireID, picURI) => {
    const ppUpdate = await Users.findOneAndUpdate({ firebaseID: currFireID }, { profilePicURI: picURI }, { new: true });
    return ppUpdate;
  },
  // captions req handling
  getCaptions: (photoID, cb) => {
    let objIDPhoto = mongoose.Types.ObjectId(photoID);
    Users.find({'photos._id': objIDPhoto}, { captions: 1, _id: 1 }).exec((err, docs) => {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        console.log(docs);
        cb(null, docs);
      }
    });
    // let objIDPhoto = mongoose.Types.ObjectId(photoID);
    // Captions.find({photoID: photoID}).exec((err, docs) => {
    //   if (err) {
    //     console.log(err);
    //     cb(err, null);
    //   } else {
    //     console.log(docs);
    //     cb(null, docs);
    //   }
    // });
  },
  postCaption: async (capUsername, photoID, captionBody, cb) => {
    console.log("trying to post caption!");
    let objIDPhoto = mongoose.Types.ObjectId(photoID);
    let captionToAdd = new Captions({
      photoID: photoID,
      body: captionBody,
      captioner: capUsername,
      likes: 0,
      likeUsers: []
    });
    captionToAdd.save();
    //{$push: {'users.photos.$.captions': captionToAdd}}
    const doc = await Users.findOneAndUpdate({"photos._id": objIDPhoto}, {$push: {"photos.$.captions": captionToAdd}}, {new:true });
    // doc.photos.push(captionToAdd);
    console.log('NEW DOC!!!!: ', doc);
    cb(null, doc);
  },



  // photos req handling
  postPhoto: async (userInfo, uri) => {
    let photoToAdd = new Photos({ creator: userInfo.displayName, uri: uri, timePosted: Date.now(), captions: [] });
    photoToAdd.save();
    const postPhoto = await Users.findOneAndUpdate({ firebaseID: userInfo.uid }, { $push: { photos: photoToAdd } });
    return postPhoto;
  },
  getPhotos: (userID, cb) => {
    Users.findOne({ firebaseID: userID }, { friends: 1, _id: 0 }).exec((err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        let friendsArr = docs.friends;
        Users.find({ user_id: { $in: friendsArr } }).select('photos').exec((err, docs) => {
          if (err) {
            cb(err, null);
          } else {
            console.log('docs inside mongoDB.js: ', docs);
            cb(null, docs);
          }
        });
      }
    });
  },
  //friends req handling
  getUserFriends: async (userID) => {
    Users.findOne({ firebaseID: userID }, { friends: 1, _id: 0 }).exec((err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        let friendsArr = docs.friends;
        Users.find({ user_id: { $in: friendsArr } }).select(['username', 'profilePicURI',]).exec((err, docs) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, docs);
          }
        });
      }
    });
  }
};