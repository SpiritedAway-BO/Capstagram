const express = require('express');
const router = express.Router();
const controllers = require('./neo4jControllers.js');

//User Routes
router.get('/users', controllers.getAllUsers); //get all users for search
router.post('/user', controllers.createUser); //create new user
router.get('/user/:userId', controllers.getUserInfo); //get a user's info
router.put('/user/:userId/profilePic', controllers.putProfilePic); //update user profile pic
// //info
router.put('/user/:userId/bio', controllers.putUserBio);

// //Captions Routes
router.get('/captions/:photoId', controllers.getPhotoCaptions); // get captions for a photo
router.post('/captions', controllers.postCaption); // post a caption for a photo
// // router.delete('/captions/:captionId', controllers.deleteCaption); // lets a user delete their own caption - might need to think this route out better
router.patch('/captions/:captionId', controllers.patchCaption); // CHANGES a caption upvote (up or down)

// //Photos Routes
router.post('/photos', controllers.postPhoto); //posts user photo  - Query param: userId
router.get('/photos/:userId', controllers.getPhotos); //gets all photos (esp. for trending)   - Query param: userId
router.get('/user/:userId/photos', controllers.getUserPhotos); //gets one user's photos (for main page and friends page)

// //Friends Route
router.get('/user/:firebaseID/friends', controllers.getFriends); //gets a user's friends
router.post('/user/friends', controllers.addFriend); // add a friend
// // router.delete('/user/:userId/friends', controllers.removeFriend); // removes a friend   - Query param: friendId

module.exports = router;